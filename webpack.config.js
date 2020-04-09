const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html',
});

console.log(path.resolve(__dirname, 'src/hoc/'));

module.exports = {
  entry: './src/index.js', // 進入點
  output: { // 輸出位置
    path: path.join(__dirname, 'dist'),
    // publicPath: '/dist/',
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [htmlPlugin],
  resolve: {
    alias: {
      hoc: path.resolve(__dirname, 'src/hoc/'),
      helper: path.resolve(__dirname, 'src/helper/'),
      public: path.resolve(__dirname, 'src/public/'),
    },
    extensions: ['*', '.js', '.jsx'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // 網站內容從哪來，預設會使用 '/'
    // publicPath: '/assets/',    // 打包好的檔案將在這個路由下取用
    compress: false, // 使用 gzip 壓縮
    port: 8080,
    index: 'index.html',
    hot: true, // 使用 HMR
    host: '0.0.0.0', // 預設是 localhost，設定則可讓外網存取
    open: true, // 打開瀏覽器
    inline: true,
    historyApiFallback: true, // https://webpack.js.org/configuration/dev-server/#devserverhistoryapifallback
    // useLocalIp: true,
    // proxy: {
    //   'http://localhost:1337': 'http://localhost:3000',
    // },
  },
};
