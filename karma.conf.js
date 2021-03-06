// Karma configuration
// Generated on Thu Jun 12 2014 00:40:31 GMT+0200 (CEST)

var webpackConfig = require('./webpack.config');
webpackConfig['cache'] = true;
webpackConfig['module']['postLoaders'] = [ {
  test: /\.jsx$/,
  exclude: /(Test|node_modules)\//,
  loader: 'istanbul-instrumenter'
} ];

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'test/phantomjs-shims.js',

      'client/**/*Test.*'
    ],


    // list of files to exclude
    exclude: [
      'client/app.*',
      '*.scss'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'client/**/*Test.*': ['webpack']
    },


    webpack: webpackConfig,


    webpackServer: {
      stats: {
        colors: true
      },
      quiet: true
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots', 'coverage'],


    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/',
      subdir: 'lcov'
    },


    junitReporter: {
      outputFile: 'test/reports/test-results.xml',
      suite: ''
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,


    plugins: [
      require("karma-jasmine"),
      require("karma-phantomjs-launcher"),
      require("karma-coverage"),
      require("karma-webpack"),
      require("karma-junit-reporter")
    ]
  });
};
