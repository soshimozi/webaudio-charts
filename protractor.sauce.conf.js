
exports.config = {
  /**
   * Use `seleniumAddress` for faster startup; run `./node_modules/.bin/webdriver-manager start` to launch the Selenium server.
   * Use `seleniumPort` to let Protractor manage its own Selenium server instance (using the server JAR in its default location).
   */
   sauceUser: process.env.SAUCE_USERNAME,
   sauceKey: process.env.SAUCE_ACCESS_KEY,
   sauceSeleniumAddress: 'localhost:4445/wd/hub',
   sauceLabs: {
     testName: 'test-pdf-generation Protractor tests',
     startConnect: false
   },
  rootElement: '#test-pdf-generation',


  /**
   * Path to your E2E test files, relative to the location of this configuration file.
   * We're pointing to the directory where our CoffeeScript output goes.
   */
  specs: [
    'e2e/features/**/*.feature',
  ],

  /**
   * Properties passed to Selenium -- see https://code.google.com/p/selenium/wiki/DesiredCapabilities for more info.
   */


  multiCapabilities: [
    {
      'browserName': 'chrome',
      'name' : 'test-pdf-generation Chrome'
    },
    {
      'browserName': 'internet explorer',
      'version' : '9',
      'name' : 'test-pdf-generation Internet Explorer'
    }
  ],

  //directConnect : true,
  framework: 'cucumber',
  cucumberOpts: {
    require: ['e2e/step_definitions/**/*.js', 'e2e/support/**/*.js'],
    format: 'pretty'
  },
  /**
   * This should point to your running app instance, for relative path resolution in tests.
   */
  baseUrl: 'http://localhost:63237',
  params: {
    testUrl : 'http://localhost:63237/test-pdf-generation',
    loginUrl : 'https://dev-login.pdsconnect.com'
  }
};
