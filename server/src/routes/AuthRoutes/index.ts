import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  FastifyServerOptions,
} from 'fastify'
import { z } from 'zod'
import { prisma } from '../../lib/prisma/prisma-config'
import nodemalier from 'nodemailer'
import { randomUUID } from 'crypto'
import bcrypt from 'bcrypt'
import jwt, { verify } from 'jsonwebtoken'
// import { AuthMiddleware } from '../../middlewares/AuthMiddleware'

async function AuthRoutes(
  fastify: FastifyInstance,
  options: FastifyServerOptions,
) {
  // Register account route
  fastify.post(
    '/register-new-account',
    async (
      request: FastifyRequest<{
        Body: { name: string; email: string; password: string }
      }>,
      reply: FastifyReply,
    ) => {
      const { name, email: userEmail, password } = request.body

      // Verify Validation
      const passwordRegex =
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/

      const userSchema = z.object({
        name: z.string().min(3).max(20),
        userEmail: z.string().email(),
        password: z.string().min(8).max(30).regex(passwordRegex),
      })

      const resultUserSchema = userSchema.safeParse({
        name,
        userEmail,
        password,
      })

      if (resultUserSchema.success === false) {
        reply
          .status(422)
          .send({ error: 'Unprocessable Entity', more: resultUserSchema })
        return
      }

      // Check same email in database
      const existingEmail = await prisma.user.findFirst({
        where: {
          email: userEmail,
        },
      })

      if (existingEmail) {
        reply.status(409).send({ error: 'E-mail already registered' })
        return
      }

      // Email verification
      const transporter = nodemalier.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_APP,
          pass: process.env.PASSWORD_EMAIL_APP,
        },
      })

      const verificationId = randomUUID()

      const mailOptions = {
        from: process.env.EMAIL_APP,
        to: userEmail,
        subject: 'Confirm your email on the link below to start using the app',
        text: `${process.env.WEB_BASE_URL}/auth-content/confirm-email/${verificationId}`,
      }

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reply
            .status(500)
            .send({ error: 'Internal error, please try again later' })
        }
      })

      const hashedPassword = await bcrypt.hash(password, 14)

      await prisma.user.create({
        data: {
          name,
          email: userEmail,
          password: hashedPassword,
          verification_uuid: verificationId,
        },
      })

      reply.status(201).send({
        message:
          'Cadastro realizado com sucesso. Verifique seu e-mail para confirmar sua conta.',
      })
    },
  )

  // Confirm Email
  fastify.get(
    '/confirm-email/:id',
    async (
      request: FastifyRequest<{ Params: { id: string } }>,
      reply: FastifyReply,
    ) => {
      const verificationUUID = request.params.id

      const userAlreadyId = await prisma.user.findFirst({
        where: {
          verification_uuid: verificationUUID,
        },
        select: {
          id: true,
        },
      })

      if (userAlreadyId) {
        await prisma.user.update({
          where: {
            id: userAlreadyId.id,
          },
          data: {
            email_checked: 'checked',
            verification_uuid: null,
          },
        })
      } else {
        reply.status(401).send({ error: 'Unauthorized' })
        return
      }

      reply.status(200).send({ message: 'Email successfully verified' })
    },
  )

  // Login
  fastify.post(
    '/login-session',
    async (
      request: FastifyRequest<{
        Body: { email: string; password: string; rememberMe: boolean }
      }>,
      reply: FastifyReply,
    ) => {
      const { email, password, rememberMe } = request.body

      // Verify Email
      const userAlready = await prisma.user.findFirst({
        where: {
          email,
        },
      })

      if (!userAlready) {
        reply.status(401).send({ error: 'Invalid email or password' })
        return
      }

      // Verify Password
      const passwordMatch = await bcrypt.compare(password, userAlready.password)
      if (!passwordMatch) {
        reply.status(401).send({ error: 'Invalid email or password' })
        return
      }

      let authTokenRemember

      if (rememberMe) {
        authTokenRemember = randomUUID()

        await prisma.user.update({
          where: {
            id: userAlready.id,
          },
          data: {
            remember_me_uuid: authTokenRemember,
          },
        })
      }

      const authToken = jwt.sign(
        {
          name: userAlready.name,
          email: userAlready.email,
        },
        process.env.JWT_SECRET as string,
        {
          subject: userAlready.id,
        },
      )

      reply.status(200).send({
        user_id: userAlready.id,
        auth_user_token: authToken,
        user_token_remember: authTokenRemember,
      })
    },
  )

  // Verify Remember-me
  fastify.post(
    '/user-verify-auth-token',
    async (
      request: FastifyRequest<{ Body: { authTokenRemember: string } }>,
      reply,
    ) => {
      const { authTokenRemember } = request.body

      const userWithRememberToken = await prisma.user.findFirst({
        where: {
          remember_me_uuid: authTokenRemember,
        },
      })

      if (!userWithRememberToken) {
        reply.status(401).send({ error: 'Token not found' })
        return
      }

      const authToken = jwt.sign(
        {
          name: userWithRememberToken.name,
          email: userWithRememberToken.email,
        },
        process.env.JWT_SECRET as string,
        {
          subject: userWithRememberToken.id,
        },
      )

      reply.status(200).send({ auth_user_token: authToken })
    },
  )

  // Protect route
  fastify.post(
    '/user-verify-protected-routes',
    async (request: FastifyRequest, reply) => {
      const { sessionAuthCookieBody } = request.body

      const decodedCookieBody = verify(
        sessionAuthCookieBody,
        process.env.JWT_SECRET as string,
      ) as {
        sub: string
      }

      const authTokenHeaders = request.headers.authorization

      const [, authToken] = authTokenHeaders.split(' ')

      const decodedCookieHeader = verify(
        authToken,
        process.env.JWT_SECRET as string,
      ) as {
        sub: string
      }

      if (decodedCookieBody.sub === decodedCookieHeader.sub) {
        reply.status(200).send({ message: 'User is logged in' })
      } else {
        reply.status(401).send({ message: 'Token not found' })
      }
    },
  )

  // Verify Email for recover password
  fastify.post(
    '/recover-password-email',
    async (
      request: FastifyRequest<{
        Body: { email: string }
      }>,
      reply: FastifyReply,
    ) => {
      const { email: userEmail } = request.body

      const userEmailSchema = z.object({
        userEmail: z.string().email(),
      })

      const resultUserEmailSchema = userEmailSchema.safeParse({ userEmail })

      if (resultUserEmailSchema.success === false) {
        reply
          .status(422)
          .send({ error: 'Ivalid Email', more: resultUserEmailSchema })
        return
      }

      const existingUserWithThisEmail = await prisma.user.findFirst({
        where: {
          email: userEmail,
        },
      })

      if (!existingUserWithThisEmail) {
        reply.status(404).send({ error: 'Email not registered' })
        return
      }

      const transporter = nodemalier.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_APP,
          pass: process.env.PASSWORD_EMAIL_APP,
        },
      })

      function generateRecoverPasswordCode() {
        let codigo = ''
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        for (let i = 0; i < 6; i++) {
          codigo += caracteres.charAt(
            Math.floor(Math.random() * caracteres.length),
          )
        }
        return codigo
      }

      const recoverPasswordCode = generateRecoverPasswordCode()

      const mailOptions = {
        from: process.env.EMAIL_APP,
        to: userEmail,
        subject: 'Verification code to recover your account in Task List app',
        text: `Your code is ${recoverPasswordCode}`,
      }

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reply
            .status(500)
            .send({ error: 'Internal error, please try again later' })
        }
      })

      await prisma.user.update({
        where: {
          email: userEmail,
        },
        data: {
          recover_password_code: recoverPasswordCode,
        },
      })

      reply.status(200).send({ message: 'Generated recovery code' })
    },
  )

  // Verify Code for recover password
  fastify.post(
    '/recover-password-code',
    async (
      request: FastifyRequest<{ Body: { code: string; email: string } }>,
      reply: FastifyReply,
    ) => {
      const { code: verifyCode, email: userEmail } = request.body

      const existingCodeWithThisEmail = await prisma.user.findFirst({
        where: {
          AND: [{ recover_password_code: verifyCode }, { email: userEmail }],
        },
      })

      if (!existingCodeWithThisEmail) {
        reply.status(404).send({ error: 'Code not found' })
        return
      }

      await prisma.user.update({
        where: {
          id: existingCodeWithThisEmail.id,
        },
        data: {
          recover_password_code: null,
        },
      })

      reply.status(200).send({ message: 'Code is valid for this Email' })
    },
  )
}

export { AuthRoutes }
