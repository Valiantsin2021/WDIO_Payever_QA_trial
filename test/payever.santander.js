const expectChai = require('chai').expect
const LoginSantander = require('../pageobjects/login.santander')
const BusinessPage = require('../pageobjects/business')
const {
  baseUrl,
  business,
  transactions,
  checkout,
  connect,
  settings,
  pointOfSale,
  logoutUrl,
  santander
} = require('../utils/constants')
const { generatePassword } = require('../utils/helper')
const { faker } = require('@faker-js/faker')
const name = faker.name.firstName()
const lastname = faker.name.lastName()
const companyName = faker.company.name()
const email = faker.internet.email()
const phone = faker.phone.number()
const pass = generatePassword()
const vat = faker.finance.iban()

describe(`Should open ${baseUrl}${santander} and`, () => {
  before(async () => {
    await browser.deleteCookies()
  })
  it('Check create account modal is displayed', async function () {
    console.info(`should open ${baseUrl}${santander} and register new account`)
    await LoginSantander.maximize()
    await LoginSantander.open()
    await expect(LoginSantander.fashionHeader).toBeDisplayed()
  })
  it('Create account with valid credentials', async function () {
    console.info(`Create account with valid credentials`)
    await LoginSantander.createAccount(name, lastname, email, pass)
    await expect(LoginSantander.getStartedBtn).toBeDisplayed()
  })
  it('Fill out the business information', async function () {
    console.info(`Fill out the business information`)
    await LoginSantander.businessStatusText.waitForDisplayed()
    await LoginSantander.fillBusinessInfo(companyName, phone, vat)
    await expect(BusinessPage.welcomeHeader).toBeDisplayed()
    await BusinessPage.getStartedBtn.waitAndClick()
  })
  it(`Validate the page header is ${business}`, async function () {
    console.info(`Validate the page header is ${business}`)
    const pageHeader = await BusinessPage.pageHeader.waitAndGetText()
    expectChai(pageHeader).to.eq(business)
  })
  it(`Validate the Transactions app is present on the Dashboard`, async function () {
    console.info(`Validate the Transactions app is present on the Dashboard`)
    await expect(BusinessPage.transactionsApp).toBeDisplayed()
    await expect(BusinessPage.transactionsApp).toHaveText(transactions)
  })
  it(`Validate the Checkout app is present on the Dashboard`, async function () {
    console.info(`Validate the Checkout app is present on the Dashboard`)
    await expect(BusinessPage.checkoutApp).toBeDisplayed()
    await expect(BusinessPage.checkoutApp).toHaveText(checkout)
  })
  it(`Validate the Connect app is present on the Dashboard`, async function () {
    console.info(`Validate the Connect app is present on the Dashboard`)
    await expect(BusinessPage.connectApp).toBeDisplayed()
    await expect(BusinessPage.connectApp).toHaveText(connect)
  })
  it(`Validate the Point of Sale app is present on the Dashboard`, async function () {
    console.info(`Validate the Point of Sale app is present on the Dashboard`)
    await expect(BusinessPage.pointOfSaleApp).toBeDisplayed()
    await expect(BusinessPage.pointOfSaleApp).toHaveText(pointOfSale)
  })
  it(`Validate the Settings app is present on the Dashboard`, async function () {
    console.info(`Validate the Settings app is present on the Dashboard`)
    await expect(BusinessPage.settingsApp).toBeDisplayed()
    await expect(BusinessPage.settingsApp).toHaveText(settings)
  })
  it(`Clean and delete the testing account`, async function () {
    await BusinessPage.logout()
    await expect(browser).toHaveUrlContaining(logoutUrl)
  })
})
