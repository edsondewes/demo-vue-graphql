const path = require("path");
const merge = require("webpack-merge");
const webpack = require("webpack");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  output: {
    path: path.resolve(__dirname, "./public", "js"),
  },
  devtool: "inline-source-map",
  plugins: [
    new webpack.DefinePlugin({
      __AUTH_URL__: JSON.stringify("http://localhost:4001"),
      __GRAPHQL_URL__: JSON.stringify("http://localhost:4000"),
    }),
  ],
  devServer: {
    contentBase: "./public",
    host: "0.0.0.0",
    port: 3000,
    historyApiFallback: true,
  },
});
