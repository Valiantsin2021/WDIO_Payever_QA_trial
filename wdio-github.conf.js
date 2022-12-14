const basicConfig = require('./wdio.conf')
exports.config = {
  ...basicConfig.config,
  capabilities: [
    {
      maxInstances: 2,
      browserName: 'chrome',
      acceptInsecureCerts: true,
      'goog:chromeOptions': {
        args: ['--headless', '--disable-infobars', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage', '--window-size=1920,1080'],
      },
    },
    // {
    //   maxInstances: 2,
    //   browserName: 'MicrosoftEdge',
    //   acceptInsecureCerts: true,
    //   'ms:edgeOptions': {
    //     args: ['--headless', '--disable-gpu', '--disable-dev-shm-usage']
    //   }
    // }
  ]
}