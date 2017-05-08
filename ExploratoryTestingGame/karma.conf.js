// Karma configuration
// Generated on Sat May 28 2016 13:08:24 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({
    client: {
      args: [process.env.pactbrokerurl, process.env.pactmockurl]
    },

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'sinon'],


    // list of files / patterns to load in the browser
    files: [
        'http://code.jquery.com/jquery-latest.min.js',
        'utils/pact-consumer-js-dsl.js',
       //'utils/pact_helper.js',
        'public/javascripts/scorecard.js',
        'public/javascripts/map.js',
        'public/javascripts/map.spec.js',
        'public/javascripts/hero.js',
        'public/javascripts/hero.spec.js',
        'public/javascripts/timebox.js',
        'public/javascripts/timebox.spec.js',
        'public/javascripts/discoverables.js',
        'public/javascripts/discoverables.spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


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
    browsers: ['Chrome_without_security'],
    customLaunchers: {
      Chrome_without_security: {
        base: 'Chrome',
        flags: ['--disable-web-security']
      }
    },


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
