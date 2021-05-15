pipeline {
  agent any
  stages {
    stage("install projects") {
      nodejs("14.16.1") {
        sh 'npm install'
      }
    }
    stage("test front_end") {
      nodejs("14.16.1") {
        sh 'npm run test'
      }
    }
    stage("build front_end and back_end") {
      nodejs("14.16.1") {
        sh 'npm run build'
      }
    }
  }
}
