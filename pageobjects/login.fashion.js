const { fashion } = require('../utils/constants')
const Page = require('./page')
const BusinessPage = require('../pageobjects/business')
class LoginFashion extends Page {
  get fashionHeader() {
    return $('div.registration-header-title')
  }
  get firstNameInput() {
    return $('input[formcontrolname="firstName"]')
  }
  get lastNameInput() {
    return $('input[formcontrolname="lastName"]')
  }
  get emailInput() {
    return $('input[type="email"]')
  }
  get passInput() {
    return $('input[formcontrolname="password"]')
  }
  get confirmPassInput() {
    return $('input[formcontrolname="confirmPass"]')
  }
  get signUpBtn() {
    return $('button[type="submit"]')
  }
  get getStartedBtn() {
    return $('button[type="submit"]')
  }
  get businessStatusText() {
    return $('//span[text()=" Registered Business "]')
  }
  get dropdownBtns() {
    return $$('span.dropdown-arrow')
  }
  get industryDropdownBtn() {
    return $('div.dropdown-arrow')
  }
  get businessStatusChoice() {
    return $('//span[text()=" Solo Entrepreneur "]')
  }
  get statusChoice() {
    return $('//span[text()=" Growing an existing business "]')
  }
  get salesChoice() {
    return $('//span[text()=" 50.000 EUR to 250.000 EUR "]')
  }
  get industryChoice() {
    return $('//span[text()=" Fashion "]')
  }
  get phoneChoice() {
    return $('//span[text()=" +34 Spain "]')
  }
  get comanyNameInput() {
    return $('input[formcontrolname="name"]')
  }
  get phoneInput() {
    return $('input[formcontrolname="phoneNumber"]')
  }
  async maximize() {
    await super.maximize()
  }
  async open() {
    await super.open(fashion)
  }
  async createAccount(name, lastname, email, pass) {
    await browser.keys('Tab')
    await this.firstNameInput.waitAndSetValue(name)
    await browser.keys('Tab')
    await this.lastNameInput.waitAndSetValue(lastname)
    await browser.keys('Tab')
    await this.emailInput.waitAndSetValue(email)
    await browser.keys('Tab')
    await this.passInput.waitAndSetValue(pass)
    await browser.keys('Tab')
    await this.confirmPassInput.waitAndSetValue(pass)
    await this.signUpBtn.waitAndClick()
  }
  async fillBusinessInfo(name, phone) {
    await browser.keys('Tab')
    await this.comanyNameInput.waitAndSetValue(name)
    await browser.keys('Tab')
    await browser.keys('Tab')
    await this.phoneInput.waitAndSetValue(phone)
    await this.dropdownBtns[0].waitAndClick()
    await this.businessStatusChoice.waitAndClick()
    await this.dropdownBtns[1].waitAndClick()
    await this.statusChoice.waitAndClick()
    await this.dropdownBtns[2].waitAndClick()
    await this.salesChoice.waitAndClick()
    await this.industryDropdownBtn.waitAndClick()
    await this.industryChoice.waitAndClick()
    await this.dropdownBtns[3].waitAndClick()
    await this.phoneChoice.waitAndClick()
    await browser.pause(2000)
    await this.getStartedBtn.waitAndClick()
  }
}

module.exports = new LoginFashion()
