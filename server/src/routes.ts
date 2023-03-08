import { app } from './server'

import { AuthRoutes } from './routes/AuthRoutes'

const routes = async () => {
  // Rotas relacionadas a Autenticação
  app.register(AuthRoutes, {
    prefix: '/content-auth',
  })
}

export default routes
