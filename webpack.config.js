const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = [
  // --- UMD MINIFIED BUILD (browser/CDN) ---
  {
    mode: 'production',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'my-lib.umd.min.js',
      library: 'MyLib',
      libraryTarget: 'umd',
      globalObject: 'this',
      umdNamedDefine: true,
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          terserOptions: {
            compress: {
              drop_console: true,
            },
          },
        }),
      ],
    },
    plugins: [new CleanWebpackPlugin()],
    devtool: false,
  },

  // --- ESM UNMINIFIED BUILD (modern bundlers) ---
  {
    mode: 'production',
    entry: './src/index.js',
    experiments: {
      outputModule: true,
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'my-lib.esm.js',
      library: {
        type: 'module',
      },
    },
    optimization: {
      minimize: false, // keep unminified for readability / tree-shaking
    },
    plugins: [],
    devtool: 'source-map', // optional, useful for debugging
  },
];
