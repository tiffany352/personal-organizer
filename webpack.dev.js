const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: "development",
  target: "web",
  entry: {
    app: ["./client/index.tsx"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "[name].[hash].js",
    publicPath: '/static'
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, "client/public/index.html"),
    })
  ],
  devServer: {
    host: '0.0.0.0', // Required for docker
    publicPath: '/static/',
    contentBase: path.resolve(__dirname, "public"),
    watchContentBase: true,
    compress: true,
    port: 9001
  },
  devtool: 'inline-source-map'
}
