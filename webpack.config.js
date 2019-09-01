const path = require('path')
const version = process.env.npm_package_version
const openInEditor = require('launch-editor-middleware')

const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// Production
const prod = process.env.NODE_ENV === 'production'

module.exports = {
  // Entry package
  entry: () => {
    let e = ['@babel/polyfill', './src/main.js']
    if (prod) {
      return e
    } else {
      // return e
      return e.concat(['./mock.js'])
    }
  },
  output: {
    // Package path
    path: prod ? path.resolve(__dirname, 'dist') : path.resolve(__dirname, 'dist'),
    // Server access address
    publicPath: prod ? '/' : '/',
    // Scripts file name
    filename: prod ? 'scripts/[chunkhash].js' : '[name].js?[hash:8]'
  },
  // Setting mode
  mode: prod ? 'production' : 'development',
  // source-map
  devtool: prod ? '' : 'eval-source-map',
  devServer: {
    host: 'localhost',
    port: 3003,
    // open: true, // 自动挂起浏览器
    hot: true, // 热加载
    proxy: {
      '/v1/': { //
        // Real api
        target: 'http://47.98.116.152:8080',
        changeOrigin: true
      }
    },
    // vue-devtools open .vue file
    before (app) {
      app.use('/__open-in-editor', openInEditor())
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // this will apply to both plain `.js` files
      // AND `<script>` blocks in `.vue` files
      {
        test: /\.(js)$/,
        loader: 'babel-loader'
      },
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        // https://eslint.org/docs/user-guide/configuring#eslintignore
        loader: 'eslint-loader',
        options: { quiet: true }
      },
      // this will apply to both plain `.css` files
      // AND `<style>` blocks in `.vue` files
      {
        test: /\.css$/,
        use: [
          // This plugin extracts CSS into separate files
          prod ? MiniCssExtractPlugin.loader : 'vue-style-loader',
          prod ? 'css-loader' : 'css-loader?sourceMap',
          {
            // https://stylelint.io/user-guide/configuration/#ignorefiles
            loader: prod ? 'postcss-loader' : 'postcss-loader?sourceMap'
          }
        ]
      },
      // this will apply to both plain `.scss` files
      // AND `<style lang="scss">` blocks in `.vue` files
      {
        test: /\.scss$/,
        use: [
          prod ? MiniCssExtractPlugin.loader : 'vue-style-loader',
          prod ? 'css-loader' : 'css-loader?sourceMap',
          {
            loader: prod ? 'sass-loader' : 'sass-loader?sourceMap',
            options: {
              implementation: require('sass')
            }
          },
          {
            // https://stylelint.io/user-guide/configuration/#ignorefiles
            loader: prod ? 'postcss-loader' : 'postcss-loader?sourceMap'
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          // limit 8Kb base64
          limit: '8192',
          name: prod ? 'images/[contenthash].[ext]' : '[name].[ext]?[hash:8]'
        }
      },
      {
        test: /\.(ttf|otf|woff|woff2|eot)$/,
        loader: 'file-loader',
        options: {
          name: prod ? 'fonts/[contenthash].[ext]' : '[name].[ext]?[hash:8]'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: prod ? 'styles/[contenthash].css' : '[name].css?[hash:8]'
    }),
    // clean dist
    new CleanWebpackPlugin(),
    // Plugin that simplifies creation of HTML files to serve your bundles
    new HtmlWebpackPlugin({
      // chunksSortMode: 'none',
      template: 'public/index.html',
      meta: { version: version },
      title: '一步网'
    }),
    new CopyWebpackPlugin([{
      from: 'public',
      toType: 'dir'
    }])
  ],
  optimization: {
    // split chunks
    splitChunks: {
      chunks: 'all'
    },
    // split runtime
    runtimeChunk: {
      name: entrypoint => `runtime~${entrypoint.name}`
    }
  },
  resolve: {
    // import form ignore extension
    extensions: ['.js', '.vue', '.json'],
    alias: {
      // https://vuejs.org/v2/guide/installation.html#Explanation-of-Different-Builds
      'vue$': 'vue/dist/vue.esm.js',
      // e.g. css ~@/assets/images, js @/components
      '@': path.resolve('src')
    }
  }
}
