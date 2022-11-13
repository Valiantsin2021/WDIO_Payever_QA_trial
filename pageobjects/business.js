const Page = require('./page')

class BusinessPage extends Page {
  get welcomeHeader() {
    return $('div.welcome-screen-content-title')
  }
  get getStartedBtn() {
    return $('button.welcome-screen-content-button')
  }
  get pageHeader() {
    return $('span.business-switcher__business-name')
  }
  get transactionsApp() {
    return $('//div[text()="Transactions"]')
  }
  get checkoutApp() {
    return $('//div[text()="Checkout"]')
  }
  get connectApp() {
    return $('//div[text()="Connect"]')
  }
  get productsApp() {
    return $('//div[text()="Products"]')
  }
  get shopApp() {
    return $('//div[text()="Shop"]')
  }
  get pointOfSaleApp() {
    return $('//div[text()="Point of Sale"]')
  }
  get settingsApp() {
    return $('//div[text()="Settings"]')
  }
  get avatarBtn() {
    return $('svg[avatarSlot].icon')
  }
  get welcomeBtn() {
    return $('div.welcome-screen-content-description + button')
  }
  get deleteBtn() {
    return $('button[color="warn"]')
  }
  get confirmDeleteBtn() {
    return $('//button[text()="Delete Business"]')
  }
  async logout() {
    await this.avatarBtn.click()
    await browser.pause(2000)
    await this.welcomeBtn.waitAndClick()
    await this.deleteBtn.waitForDisplayed()
    await this.deleteBtn.click()
    await this.confirmDeleteBtn.waitAndClick()
  }
}

module.exports = new BusinessPage()
