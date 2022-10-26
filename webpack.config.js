const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const config = {
  mode: 'development',
  entry: {
    main: "./src/index.js",
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname,'./dist/'),
    clean: true,
},
module: {
  rules: [
    {
      test: /\.(png|jpe?g|gif)$/i,
      use: [
        {
          loader: 'file-loader',
        },
      ],
    },
    {
      test: /\.s[ac]ss$/i,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            implementation: require('sass'),
            sourceMap: true,
          },
        },
      ],
    },
  ],
},
devServer: {
  static: {
      directory: path.join(__dirname, './dist/'),
  },
  port: 9000,
},
mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      title: "Js Modularization homework",
      template: "./src/index.html"
    }),
    new MiniCssExtractPlugin(),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      pngquant: {
        quality: '70-85'
      }
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          name: "vendors"
        }
      }
    }
  }

}

module.exports = (env, argv) => {
  if (env.NODE_ENV === 'development') {
    config.devtool = 'inline-source-map'
  }
  return config
}

