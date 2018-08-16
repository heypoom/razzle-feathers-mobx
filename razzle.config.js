const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const autoprefixer = require('autoprefixer')

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: () => [
      autoprefixer({
        browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
      }),
    ],
  },
}

function modify(config, {target, dev}, webpack) {
  config.optimization = {
    minimizer: [new OptimizeCSSAssetsPlugin({})],
  }

  const styleLoader = [
    dev ? 'style-loader' : MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        modules: false,
        sourceMap: dev,
        importLoaders: 1,
      },
    },
    postcssLoader,
    'sass-loader',
  ]

  config.module.rules.push({
    test: /.(scss|sass)$/,
    use: styleLoader,
  })

  // if (target === 'server') {
  //   // On the server, we can just simply use css-loader to
  //   // deal with scss imports
  //   config.module.rules.push({
  //     test: /.(scss|sass)$/,
  //     use: 'css-loader',
  //   })
  // }

  return config
}

module.exports = {modify}
