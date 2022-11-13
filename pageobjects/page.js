const { baseUrl } = require('../utils/constants')
module.exports = class Page {
  async maximize() {
    await browser.maximizeWindow()
  }
  async open(link) {
    await browser.url(baseUrl + link)
  }
}
