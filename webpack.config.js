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
      filename: 'suku.umd.min.js',
      library: 'Suku',
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


];
