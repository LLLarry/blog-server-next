/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  sassOptions: {},
  basePath: '/new',
  // async rewrites() {
  //   return {
  //     fallback: [
  //       {
  //         source: '/:path*',
  //         destination: `http://121.5.230.70/:path*`,
  //       },
  //     ],
  //   }
  // },
  env: {
    BASE_URL: process.env.BASE_URL
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config
    config.module.rules.push({
      test: /\.svg$/,
      include: path.resolve(__dirname, './assets/svgs'),
      use: [
        {
          loader: 'svg-sprite-loader',
          options: {
            symbolId: 'icon-[name]'
          },
        }
      ]
    })

    config.resolve.alias['@'] = path.resolve(__dirname, './')
    config.resolve.alias['@@'] = path.resolve(__dirname, './components')
    return config
  },
}
const removeImports = require('next-remove-imports')();
module.exports = removeImports(nextConfig)
