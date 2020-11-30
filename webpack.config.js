const ForkTsWebpackPlugin = require("fork-ts-checker-webpack-plugin");
module.exports = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.node$/,
        use: "node-loader",
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
  plugins: [new ForkTsWebpackPlugin()],
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
  },
};
