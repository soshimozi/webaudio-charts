// Karma configuration
// Generated on Fri Feb 20 2015 10:21:22 GMT-0600 (Central Standard Time)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',


    // frameworks to use
    frameworks: ['mocha', 'chai'],


    // list of files / patterns to load in the browser
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-route/angular-route.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/pds-angular-modules/dist/*.js',
      'node_modules/angular-bootstrap/ui-bootstrap.js',
      './app/**/*.js',
      './app/**/*.html'
    ],

    ngHtml2JsPreprocessor: {
      moduleName: 'test-pdf-generation-templates'
    },

    // list of files to exclude
    exclude: [

    ],


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    preprocessors: {
      './app/**/*.js': ['coverage'],
      './app/**/*.html': ['ng-html2js']
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      type: 'text',
      dir: 'coverage/'
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


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: ['PhantomJS'],

    //plugins: ['karma-phantomjs-launcher', 'karma-coverage', 'karma-mocha', 'karma-chai', 'ng-html2js'],
    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true
  });
};
