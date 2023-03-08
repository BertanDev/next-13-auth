import { FastifyReply, FastifyRequest } from 'fastify'
import { verify } from 'jsonwebtoken'

async function AuthMiddleware(
  request: FastifyRequest,
  reply: FastifyReply,
  next: () => void,
) {
  const authTokenHeaders = request.headers.authorization

  if (!authTokenHeaders) {
    reply.status(401).send('User not logged')
    return
  }

  const [, authToken] = authTokenHeaders.split(' ')

  try {
    const decoded = verify(authToken, process.env.JWT_SECRET as string) as {
      sub: string
    }

    request.user_id = decoded.sub
  } catch (error) {
    reply.status(401).send('Token not found')
    return
  }

  next()
}

export { AuthMiddleware }
