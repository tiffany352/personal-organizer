const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: "development",
  target: "web",
  entry: {
    app: ["./client/index.ts"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "bundle-front.js",
    publicPath: '/assets/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, "client/public/index.html"),
    })
  ],
  devServer: {
    host: '0.0.0.0', // Required for docker
    publicPath: '/assets/',
    contentBase: path.resolve(__dirname, "public"),
    watchContentBase: true,
    compress: true,
    port: 9001
  },
  devtool: 'inline-source-map'
}
