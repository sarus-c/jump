pipeline {
  agent none
  stages {
    stage("install front_end") {
      agent any
      steps {
        nodejs("Node-14.16.1") {
          sh 'npm run install:fe'
        }
      }
    }
    stage("install back_end") {
      agent any
      steps{
        nodejs("Node-14.16.1") {
          sh 'npm run install:be'
        }
      }
    }
    stage("test front_end") {
      agent any
      steps{
        nodejs("Node-14.16.1") {
          sh 'npm run test:fe'
        }
      }
    }
    stage("build front_end") {
      agent any
      steps{
        nodejs("Node-14.16.1") {
          sh 'npm run build:fe'
        }
      }
    }
    stage("build back_end") {
      agent any
      steps{
        nodejs("Node-14.16.1") {
          sh 'npm run build:be'
        }
      }
    }
    stage("install services") {
      agent { docker { image 'python:3-alpine' } }
      steps {
          sh 'cd packages/services && pip install -r requirements.txt'
      }
    }
  }
}
