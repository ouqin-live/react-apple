/* eslint-disable no-undef */
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const chalk = require("chalk");

module.exports = {
  entry: path.resolve(__dirname, "../src/index.js"), // 入口文件
  output: {
    filename: "bundle.[hash:8].js", // 打包后的文件名称
    path: path.resolve(__dirname, "../dist"), // 打包后的目录
    // 指定静态资源服务路径，包括懒加载时的异步请求路径
    publicPath: "/",
  },
  resolve: {
    extensions: [".jsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                // modifyVars: {
                //   "primary-color": "#5dbe8a",
                //   "item-active-bg": "#5dbe8a",
                //   "item-hover-bg": "#5dbe8a",
                //   "radio-button-hover-color": "#5dbe8a",
                //   "radio-button-active-color": "#5dbe8a",
                //   "tooltip-bg": "#5dbe8a",
                //   "font-size-base": "14px",
                //   "border-radius-base": "2px",
                //   "border-color-base": "#5dbe8a",
                // },
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        type: "asset/inline",
      },
    ],
  },
  plugins: [
    // 分离html，并且引入打包好的js文件
    new htmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    // 清除上一次打包的文件
    new CleanWebpackPlugin(),
    new ProgressBarPlugin({
      format: `  :msg [:bar] ${chalk.green.bold(":percent")} (:elapsed s)`,
    }),
  ],
};
