const path = require("path");
const merge = require("webpack-merge");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const common = require("./webpack.common.js");

module.exports = env => {
  return merge(common, {
    mode: "production",
    output: {
      path: path.resolve(__dirname, "./dist", "js"),
    },
    plugins: [
      new webpack.DefinePlugin({
        __AUTH_URL__: JSON.stringify(env.AUTH_URL),
        __GRAPHQL_URL__: JSON.stringify(env.GRAPHQL_URL),
      }),
      new CopyWebpackPlugin([{ from: "./public", to: "../" }]),
    ],
  });
};
