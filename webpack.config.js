const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const OfflinePlugin = require("offline-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");

module.exports = {
  entry: {
    index: path.join(__dirname, "src", "index.jsx")
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        loader: "style-loader!css-loader!sass-loader"
      },
      {
        test: /\.(jpg|png)$/,
        use: [
          {
            loader: "file-loader"
          }
        ]
      },
      {
        test: /\.(ttf)$/,
        use: ["url-loader?limit=100000"]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    host: "0.0.0.0",
    port: 3000
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "index.html"
    }),
    new WebpackPwaManifest({
      name: `name? ${process.env.npm_package_version}`,
      short_name: `short_name ${process.env.npm_package_version}`,
      description: "description Placeholder",
      // background_color: "#ffffff",
      background_color: "#fed322",
      theme_color: "#fed322",
      display: "standalone",
      orientation: "portrait",
      crossorigin: "anonymous", //can be null, use-credentials or anonymous
      icons: [
        {
          src: path.resolve("src/assets/saitama.png"),
          size: "1024x1024" // you can also use the specifications pattern
        }
      ]
    }),
    // it's always better if OfflinePlugin is the last plugin added
    new OfflinePlugin({
      safeToUseOptionalCaches: true,
      responseStrategy: "cache-first",
      caches: "all",
      ServiceWorker: {
        events: true
      },
      AppCache: false
    })
  ]
};
