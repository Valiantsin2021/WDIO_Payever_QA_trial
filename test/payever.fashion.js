const expectChai = require('chai').expect
const LoginFashion = require('../pageobjects/login.fashion')
const BusinessPage = require('../pageobjects/business')
const {
  baseUrl,
  business,
  transactions,
  checkout,
  connect,
  products,
  shop,
  settings,
  logoutUrl,
  fashion
} = require('../utils/constants')
const { generatePassword } = require('../utils/helper')
const { faker } = require('@faker-js/faker')
const name = faker.name.firstName()
const lastname = faker.name.lastName()
const companyName = faker.company.name()
const email = faker.internet.email()
const phone = faker.phone.number()
const pass = generatePassword()

describe(`Should open ${baseUrl}${fashion} and`, () => {
  before(async () => {
    await browser.deleteCookies()
  })
  it('Check create account modal is displayed', async function () {
    console.info(`should open ${baseUrl}${fashion} and register new account`)
    await LoginFashion.maximize()
    await LoginFashion.open()
    await expect(LoginFashion.fashionHeader).toBeDisplayed()
  })
  it('Create account with valid credentials', async function () {
    console.info(`Create account with valid credentials`)
    await browser.pause(1000)
    await LoginFashion.createAccount(name, lastname, email, pass)
    await expect(LoginFashion.getStartedBtn).toBeDisplayed()
  })
  it('Fill out the business information', async function () {
    console.info(`Fill out the business information`)
    await LoginFashion.businessStatusText.waitForDisplayed()
    await LoginFashion.fillBusinessInfo(companyName, phone)
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
  it(`Validate the Products app is present on the Dashboard`, async function () {
    console.info(`Validate the Products app is present on the Dashboard`)
    await expect(BusinessPage.productsApp).toBeDisplayed()
    await expect(BusinessPage.productsApp).toHaveText(products)
  })
  it(`Validate the Shop app is present on the Dashboard`, async function () {
    console.info(`Validate the Shop app is present on the Dashboard`)
    await expect(BusinessPage.shopApp).toBeDisplayed()
    await expect(BusinessPage.shopApp).toHaveText(shop)
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
