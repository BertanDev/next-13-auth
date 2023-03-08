import fastify from 'fastify'
import routes from './routes'
import cookie from '@fastify/cookie'
import cors from '@fastify/cors'

export const app = fastify()

app.register(cookie)
app.register(routes)
app.register(cors)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP Server is running')
  })
