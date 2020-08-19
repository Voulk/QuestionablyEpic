const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = [
  {
    name: "production",
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "lib"),
      filename: "index.js",
      libraryTarget: "commonjs2",
    },
    module: {
      rules: [
        {
          test: /\.js|jsx$/,
          include: path.resolve(__dirname, "src"),
          exclude: /(node_modules|lib)/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env"],
              },
            },
            { loader: "eslint-loader" },
          ],
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [{ loader: "style-loader" }, { loader: "css-loader" }],
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    externals: {
      react: "commonjs react",
    },
  },
  {
    name: "example",
    entry: "./example/index.js",
    output: {
      path: path.resolve(__dirname, "public"),
      filename: "bundle.js",
      publicPath: "/",
    },
    module: {
      rules: [
        {
          test: /\.js|jsx$/,
          include: [
            path.resolve(__dirname, "example"),
            path.resolve(__dirname, "src"),
          ],
          exclude: /(node_modules|lib)/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env"],
              },
            },
            { loader: "eslint-loader" },
          ],
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./example/index.html",
        filename: "./index.html",
      }),
    ],
    devServer: {
      publicPath: "/",
    },
  },
];
