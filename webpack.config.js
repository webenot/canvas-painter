const path = require('path');
const webpack = require('webpack');

//require('dotenv').config();
console.log(process.env.NODE_ENV);
const isProduction = (process.env.NODE_ENV === 'production');

// Additional plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

const SOURCE_PATH = path.resolve(__dirname, 'src');
const DIST_PATH = path.resolve(__dirname, 'dist');

module.exports = {
  // Режим
  mode: (isProduction) ? 'production' : 'development',

  optimization: {
    minimizer: [
      new TerserJSPlugin({}),
    ],
    usedExports: true,
  },

  // слежение
  watch: !isProduction,

  devtool: (isProduction) ? false : 'inline-source-map',

  // Базовый путь к проекту
  context: SOURCE_PATH,

  // Точки входа JS
  entry: {
    // Основной файл приложения
    index: [
      path.join(SOURCE_PATH, 'ts', 'index.ts'),
      path.join(SOURCE_PATH, 'sass', 'style.sass'),
    ],
  },
  // Путь для собранных файлов
  output: {
    filename: '[name].js',
    path: DIST_PATH,
    publicPath: '.',
  },
  module: {
    rules: [
      // ts rule
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /^(node_modules)$/,
      },
      // sass
      {
        test: /\.sass$/i,
        resolve: { extensions: [ '.scss', '.sass' ] },
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: path.resolve('dist', 'css') },
          },
          // 'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: !isProduction },
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: !isProduction },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: !isProduction },
          },
        ],
      },
      // Images
      {
        test: /\.(png|gif|jpe?g)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              publicPath: '../',
            },
          },
          'img-loader',
        ],

      },
      // Fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              publicPath: '../',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [ '.ts', '.tsx', '.js' ],
    alias: {
      Classes: path.join(SOURCE_PATH, 'ts', 'painter', 'classes'),
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 5000000,
    maxAssetSize: 5000000,
  },
  plugins: [
    new webpack.DefinePlugin({ NODE_ENV: JSON.stringify(process.env.NODE_ENV) }),
    new MiniCssExtractPlugin({
      filename: './css/[name].css',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(SOURCE_PATH, 'img'),
          to: path.join(DIST_PATH, 'img'),
        },
        {
          from: path.join(SOURCE_PATH, 'font'),
          to: path.join(DIST_PATH, 'font'),
        },
        {
          from: path.join(SOURCE_PATH, 'html'),
          to: DIST_PATH,
        },
      ],
    }),
    new ImageminPlugin({
      maxConcurrency: 1,
      test: filename => {
        console.log(`Attempting to compress "${filename}"...`);
        try {
          return (/\.(jpe?g|png|gif|svg)$/i).test(filename);
        } catch (e) {
          return null;
        }
      },
      plugins: [
        imageminJpegtran({ progressive: true }),
        imageminPngquant({ strip: true }),
      ],
      disable: !isProduction,
    }),
  ],
};

// PRODUCTION ONLY
if (isProduction) {
  module.exports.plugins.push(
    new webpack.LoaderOptionsPlugin({ minimize: true }),
  );
}
