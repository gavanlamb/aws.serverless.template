const path = require('path');
const ZipPlugin = require('zip-webpack-plugin');

module.exports = env => {
  return {
    context: path.join(__dirname, "lib"),
    mode: 'production',
    entry: "./Index.js",
    optimization: {
      minimize: false
    },
    performance: {
      hints: false
    },
    output: {
      libraryTarget: 'commonjs',
      path: path.join(__dirname, 'webpack'),
      filename: 'Index.js',
    },
    target: 'node',
    plugins: [
      new ZipPlugin({
        filename: env.FILENAME+'.zip'
      })
    ]
  }
};
