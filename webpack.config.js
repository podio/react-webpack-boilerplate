var webpack = require("webpack");
var path = require('path');
var fs = require('fs');

var merge = require('merge');

var jshintrc = merge(fs.readFileSync('./.jshintrc', {encoding: 'utf8'}), {
  // jshint errors are displayed by default as warnings
  // set emitErrors to true to display them as errors
  emitErrors: true,

  // jshint to not interrupt the compilation
  // if you want any file with jshint errors to fail
  // set failOnHint to true
  failOnHint: true
});

var currentEnv = process.env['NODE_ENV'];

var env = {
  production: currentEnv === 'production',
  development: currentEnv === 'development',
  test: currentEnv === 'test'
};

var addDevServerEntryPoint = function (entryPoint) {
  if (currentEnv !== 'production') {
    var entries = [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/dev-server',
      entryPoint
    ];
    return entries;
  } else {
    return entryPoint;
  }
};

var entry = {
  index: addDevServerEntryPoint('./client/entryPoints/index'),
  contacts: addDevServerEntryPoint('./client/entryPoints/contacts')
};

if (currentEnv !== 'test') {
  entry['common.js'] = './client/entryPoints/common.js'
}

var plugins = [];

if (currentEnv !== 'test') {
  plugins.push(new webpack.optimize.CommonsChunkPlugin('common', 'common.js'));
}

if (env.production) {
  plugins.push(new webpack.optimize.DedupePlugin());
  plugins.push(new webpack.optimize.UglifyJsPlugin({ output: {comments: false} })); // https://github.com/webpack/webpack/issues/324
}

if (env.production === false) {
  plugins.push(new webpack.HotModuleReplacementPlugin());
}

var jsxLoaders = ['jsx'];

if (env.production === false && env.test === false) {
  jsxLoaders.unshift('jshint-loader');
  jsxLoaders.unshift('react-hot');
}

var exports = {
  entry: entry,

  output: {
    path: env.production ? path.join('client', 'build') : __dirname + '/client',

    filename: "[name].entry.js",

    publicPath: env.production ? 'http://www.production-site.com' : 'http://localhost:3000/client/'
  },

  resolve: {
    extensions: ['', '.jsx', '.js']
  },

  plugins: plugins,

  // http://webpack.github.io/docs/loaders.html#loader-order
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: [
          "style",
          "css",
          "autoprefixer?browsers=last 2 version",
          "sass?outputStyle=expanded"
        ]
      },
      {
        test: /\.css$/,
        loaders: [
          "style",
          "css"
        ]
      },
      {
        test: /\.jsx$/,
        loaders: jsxLoaders
      }
    ]
  },

  jshint: jshintrc
};

if (env.production) {
  exports['devtool'] = 'source-map';
}

module.exports = exports;
