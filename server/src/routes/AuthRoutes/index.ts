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
import jwt from 'jsonwebtoken'
import { AuthMiddleware } from '../../middlewares/AuthMiddleware'

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

      console.log(request.body)

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

      if (rememberMe) {
        const authTokenRemember = randomUUID()

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
      })
    },
  )

  // Verify Remember-me
  fastify.get(
    '/user-verify-auth-token',
    { preValidation: AuthMiddleware },
    async (request, reply) => {
      const userId = request.user_id

      reply.status(200).send({ userId })
    },
  )
}

export { AuthRoutes }
