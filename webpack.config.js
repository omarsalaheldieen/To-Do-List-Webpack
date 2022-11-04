const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  target: 'web',
  mode: 'development',
  entry: './src/index.js',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /.html$/i,
        loader: 'html-loader'
      },
      {
        test: /.(png|jpg|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]'
        }
      },
      {
        test: /.(css)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/styles/[name][ext]'
        }
      },
      {
        test: /.(js)$/i,
        generator: {
          filename: 'assets/js/[name][ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      filename: 'index.html',
      template: './src/index.html'
    }),
    new HtmlWebpackPlugin({
      title: 'Development',
      filename: 'assets/pages/Settings.html',
      template: 'src/assets/pages/Settings.html'
    }),
    new HtmlWebpackPlugin({
      title: 'Development',
      filename: 'assets/pages/Todos.html',
      template: 'src/assets/pages/Todos.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/styles/[name].css'
    })
  ],
  output: {
    clean: true,
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
}
