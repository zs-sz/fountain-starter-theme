//
const path = require('path');
const webpack = require('webpack');
const dirNode = 'node_modules';
const dirApp = path.join(__dirname, 'js');
const dirAssets = path.join(__dirname, 'assets');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
require('dotenv').config();
// console.log(process.env);
//
var LiveReloadPlugin = require('webpack-livereload-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

//
const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

//
module.exports = {
  devtool: 'source-map',
	watch: true,
  entry: {
    app: [path.join(dirApp, 'app.js')]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist')
  },
	resolve: {
		modules: [
		dirNode,
		dirApp,
		dirAssets
		]
	},
	module: {
		rules: [
      // BABEL
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':data-src']
          }
        }
      },
      // this will apply to both plain `.js` files
      // AND `<script>` blocks in `.vue` files
      // this will apply to both plain `.css` files
      // AND `<style>` blocks in `.vue` files
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['babel-preset-env']
            }
          }
      },
      // SASS
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
        // loader: "url?limit=10000"
        use: "url-loader"
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: 'file-loader'
      }
		]
	},
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  stats: {
    warnings: false
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new LiveReloadPlugin(),
    new VueLoaderPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
  ]
}