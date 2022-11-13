const allure = require('allure-commandline')
const brows = require('./utils/browsers.js')
const ENV = process.env.ENV
let caps
if (!ENV || !['chrome', 'edge', 'firefox'].includes(ENV)) {
  console.log(
    'Starting Chrome. For other browser - please add ENV and run with\n "npm run clean && npx cross-env ENV=(chrome | edge | firefox) npm run wdio -- --suite smoke)"'
  )
  caps = brows['chrome']
} else {
  caps = brows[process.env.ENV]
}
exports.config = {
  specs: ['./test/*.js'],
  suites: {
    smoke: ['./test/*.smoke.js']
  },
  maxInstances: 2,

  capabilities: [caps],

  logLevel: 'warn',

  bail: 5,

  baseUrl: 'https://commerceos.staging.devpayever.com/registration/',

  waitforTimeout: 70000,

  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  services: [
    [
      'chromedriver',
      {
        logFileName: 'wdio-chromedriver.log',
        outputDir: 'driver-logs',
        args: ['--silent']
      }
    ]
  ],

  framework: 'mocha',
  reporters: [
    'spec',
    [
      'allure',
      {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false
      }
    ],
    [
      'junit',
      {
        outputDir: './report/',
        outputFileFormat: function (options) {
          return `results-${options.cid}.${options.capabilities}.xml`
        }
      }
    ]
  ],

  mochaOpts: {
    ui: 'bdd',
    timeout: process.env.DEBUG === 'true' ? 999999 : 70000
  },

  beforeSuite: function () {
    browser.addCommand(
      'waitAndClick',
      async function () {
        await this.waitForDisplayed({ timeout: 5000 })
        await this.click()
      },
      true
    ),
      browser.addCommand(
        'waitAndSetValue',
        async function (value) {
          await this.waitForDisplayed({ timeout: 5000 })
          await this.setValue(value)
        },
        true
      )
    browser.addCommand(
      'waitAndGetText',
      async function () {
        await this.waitForDisplayed({ timeout: 5000 })
        let text
        const tagName = await this.getTagName()
        if (
          tagName === 'textarea' ||
          tagName === 'input' ||
          tagName === 'select'
        ) {
          text = await this.getValue()
        } else {
          text = await this.getText()
        }
        return text
      },
      true
    )
  },

  afterTest: async function (step, scenario, { error }) {
    if (error) {
      const timestamp = new Date().toString().replace(/[^\w]/g, '')
      await browser.saveScreenshot(
        `./screenshots/failed-tests/test_failed${timestamp}.png`
      )
      await browser.takeScreenshot()
    }
  },

  onComplete: function () {
    const reportError = new Error('Could not generate Allure report')
    const generation = allure(['generate', 'allure-results', '--clean'])
    return new Promise((resolve, reject) => {
      const generationTimeout = setTimeout(() => reject(reportError), 10000)
      generation.on('exit', function (exitCode) {
        clearTimeout(generationTimeout)
        if (exitCode !== 0) {
          return reject(reportError)
        }
        console.log('Allure report successfully generated')
        resolve()
      })
    })
  }
}
