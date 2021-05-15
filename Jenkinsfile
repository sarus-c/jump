pipeline {
  agent any
  stages {
    stage("install front_end") {
      nodejs("14.16.1") {
        sh 'npm install'
      }
    }
    stage("install back_end") {
      nodejs("14.16.1") {
        sh 'npm install'
      }
    }
    stage("install services") {
      nodejs("14.16.1") {
        sh 'npm install'
      }
    }
    stage("test front_end") {
      nodejs("14.16.1") {
        sh 'npm run test'
      }
    }
    stage("build front_end") {
      nodejs("14.16.1") {
        sh 'npm run build'
      }
    }
    stage("build back_end") {
      nodejs("14.16.1") {
        sh 'npm run build'
      }
    }
  }
}
