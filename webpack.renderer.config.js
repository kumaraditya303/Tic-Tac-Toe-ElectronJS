const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
module.exports = {
  module: {
    rules: [
      {
        test: /\.node$/,
        use: "node-loader",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, { loader: "css-loader" }],
      },
      {
        test: /\.(m?js|node)$/,
        parser: { amd: false },
        use: {
          loader: "@marshallofsound/webpack-asset-relocator-loader",
          options: {
            outputAssetBase: "native_modules",
          },
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|\.webpack)/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
          },
        },
      },
    ],
  },
  plugins: [new ForkTsCheckerWebpackPlugin(), new MiniCssExtractPlugin()],
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
  },
};
