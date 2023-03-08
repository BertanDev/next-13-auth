/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },

  // define a base path da aplicação
  basePath: '',

  // define uma regra para ignorar a pasta pages na URL
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/pages/:path*',
      },
    ]
  },
}

module.exports = nextConfig
