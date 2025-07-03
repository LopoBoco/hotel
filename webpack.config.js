const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const webpack = require("webpack");

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
console.log('is DEV: ', isDev);

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: 'single',
  };

  if (isProd) {
    config.minimizer = [
      new CssMinimizerPlugin(),
      new TerserWebpackPlugin(),
    ];
  }

  return config;
};

const filename = (ext, folder) => {
  let name;
  if (ext === 'html') {
    name = isDev ? `[name]/index.${ext}` : `[name]/index.[hash].${ext}`;
  } else {
    name = isDev ? `[name]/[name].${ext}` : `[name]/[name].[hash].${ext}`;
  }
  return name;
};

const cssLoaders = (extra) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    "css-loader",
  ];
  if (extra) {
    loaders.push(extra);
  }
  return loaders;
};

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
  },
  optimization: optimization(),
  devServer: {
    port: 3000,
  },
  devtool: isProd ? false : 'source-map',
  plugins: [
    new HTMLWebpackPlugin({
      inject: true,
      template: 'src/index.pug',
      filename: 'index.html',
    }),
    new HTMLWebpackPlugin({
      inject: true,
      template: 'src/pages/ui-kit/ui-kit.pug',
      filename: 'ui-kit/index.html',
    }),
    // new HTMLWebpackPlugin({
    //   inject: true,
    //   template: 'src/pages/landing-page/landing-page.pug',
    //   filename: 'landing-page/index.html',
    // }),
    new HTMLWebpackPlugin({
      inject: true,
      template: 'src/pages/registration/registration.pug',
      filename: 'registration/index.html',
    }),
    // new HTMLWebpackPlugin({
    //   inject: true,
    //   template: 'src/pages/login/login.pug',
    //   filename: 'login/index.html',
    // }),
    new HTMLWebpackPlugin({
      inject: true,
      template: 'src/pages/search-room/search-room.pug',
      filename: 'search-room/index.html',
    }),
    new HTMLWebpackPlugin({
      inject: true,
      template: 'src/pages/room-details/room-details.pug',
      filename: 'room-details/index.html',
    }),

    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/favicon'),
          to: path.resolve(__dirname, 'dist/favicon'),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
      ignoreOrder: true,
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpg|svg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/[hash][ext]',
        },
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/[hash][ext]',
        },
      },
      {
        test: /\.xml$/,
        use: ['xml-loader'],
      },
      {
        test: /\.csv$/,
        use: ['csv-loader'],
      },
      {
        test: /\.css$/i,
        use: cssLoaders(),
      },
      {
        test: /\.less$/i,
        use: cssLoaders('less-loader'),
      },
      {
        test: /\.s[ac]ss$/i,
        use: cssLoaders('sass-loader'),
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.m?ts$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript'],
          },
        },
      },
      {
        test: /\.(pug|jade)$/,
        use: [
          {
            loader: 'pug-loader',
            options: {
              pretty: true,
            }
          }
        ]
      },
    ],
  },
};
