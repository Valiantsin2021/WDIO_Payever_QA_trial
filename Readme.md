# JS automation tests using WebdriverIO

## This repository purpose is to functional test automation of [Orange hrm project] https://commerceos.staging.devpayever.com/registration/ Payever web app

## Test report page  https://valiantsin2021.github.io/WDIO_Payever_QA_trial/

## Before the test run make sure to update local browsers versions to latest

## Apart of testing scenarios there have been found several defects in the app - see defects screenshots folder

## The test suites purpose is to perform the following assertions:

The basic steps flow to test the steps:

1. Visit https://commerceos.staging.devpayever.com/registration/{value}
2. Fill out the user information
3. Click ‘next’
4. Fill out the business information
5. Register the account
6. Click on get started
7. View the dashboard

## Test suite 1

The test-cases that should be automated and validated are as followed:
1. Test {value} = '', perform step 1 with value "fashion"
2. After step 7, validate the following apps to be present on the dashboard:
- Transactions, Checkout, Connect, Products, Shop, Message, settings

# Message app is not present on the Dashboard therefor the validation hase not been performed

## Test suite 2

1. Test {value} = '', perform step 1 with value "santander"
2. After step 7, validate the following apps to be present on the dashboard:
- Transactions, Checkout, Connect, Point of Sale, Settings

## Job done:

1.  Page Object model implemented
2.  Chrome, MSEdge, Firefox tests via ENV variable
3.  Test suite smoke
4.  Allure reporter
5.  Screenshots with timestamp on failure
6.  Custom commands in wdio.conf.js file
7.  Chai expect assertion

## Extras

## Setup:

1. Clone this repository or unzip downloaded file
2. Install dependencies with "npm install"
3. To run tests - open terminal and navigate to the path of the cloned project and:

    - smoke test suite with Chrome browser: npm run smoke:chrome
    - smoke test suite with Microsoft Edge browser: npm run smoke:edge
    - choose browser and suite manually - please add ENV and run with "npm run clean && npx cross-env ENV=(chrome | edge | firefox) npm run wdio -- --suite smoke"
    - To clean reports directory and screenshots: npm run clean
    - to open report: allure open
    - to run headless with Chrome: npm run run:github

To test dockerized: 
    - Clone this repository , navigate to the folder of cloned repository and run terminal 
    - "docker build -t <image name> ." (to build image)
    - "docker run -it <image name> <container name> --rm"

    - "docker start <container name>" to run container
