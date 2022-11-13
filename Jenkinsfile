pipeline {
    agent any

    stages {
        stage('Git download') {
            steps {
                git 'https://github.com/Valiantsin2021/WDIO_Payever_QA_trial'
            }
        }
        stage('Install') {
            steps {
                bat encoding: 'ASCII', returnStatus: true, script: 'npm install'
            }
        }
        stage('Run e2e and login negative test suites with Chrome browser') {
            steps {
                bat encoding: 'ASCII', returnStatus: true, script: 'npm run run:github'
            }
        }
        stage('Generate allure report') {
            steps {
                allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
            }
        }
    }
}
