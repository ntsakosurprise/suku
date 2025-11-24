const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = [



  // --- ESM UNMINIFIED BUILD (modern bundlers) ---
  {
    mode: 'production',
    entry: './src/index.js',
    experiments: {
      outputModule: true,
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'suku.esm.js',
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
