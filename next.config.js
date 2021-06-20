const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  experimental: {
    eslint: true,
  },
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    runtimeCaching,
  },
})
