const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: [
    // --- UMD BUILD ---
    {
      path: path.resolve(__dirname, 'dist'),
      filename: 'my-lib.umd.min.js',
      library: 'MyLib',
      libraryTarget: 'umd',
      globalObject: 'this',
      umdNamedDefine: true,
    },
    // --- ES MODULE BUILD ---
    {
      path: path.resolve(__dirname, 'dist'),
      filename: 'my-lib.esm.js',
      library: {
        type: 'module',
      },
    },
  ],
  experiments: {
    outputModule: true,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          compress: {
            drop_console: true,
            pure_getters: true,
            passes: 3,
          },
        },
      }),
    ],
  },
  plugins: [new CleanWebpackPlugin()],
  devtool: false, // set 'source-map' if you want debugging maps
};
