const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const OfflinePlugin = require("offline-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const CleanWebpackPlugin = require("clean-webpack-plugin");
module.exports = {
  mode: "production",
  entry: {
    index: path.join(__dirname, "src", "index.jsx")
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
  },
  devtool: false,
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
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      title: "AniList"
    }),
    new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin(),
    new WebpackPwaManifest({
      name: `My AniList`,
      short_name: `My AniList`,
      description: `A portable offline directory tree of all my anime. Current Version: ${
        process.env.npm_package_version
      }`,
      background_color: "#fed322",
      theme_color: "#fed322",
      display: "standalone",
      orientation: "portrait",
      fingerprints: false,
      crossorigin: "anonymous", //can be null, use-credentials or anonymous
      icons: [
        {
          src: path.resolve("src/assets/saitama.png"),
          sizes: [96, 144, 192, 512, 1024]
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
  ],
  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 50000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "~",
      name: true,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
};
