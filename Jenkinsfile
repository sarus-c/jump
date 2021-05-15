pipeline {
  agent any
  stages {
    stage("install front_end") {
      steps {
        nodejs("Node-14.16.1") {
          sh 'npm run install:fe'
        }
      }
    }
    stage("install back_end") {
      steps{
        nodejs("Node-14.16.1") {
          sh 'npm run install:be'
        }
      }
    }
    stage("install services") {
      steps {
        nodejs("Node-14.16.1") {
          sh 'npm run install:se'
        }
      }
    }
    stage("test front_end") {
      steps{
        nodejs("Node-14.16.1") {
          sh 'npm run test:fe'
        }
      }
    }
    stage("build front_end") {
      steps{
        nodejs("Node-14.16.1") {
          sh 'npm run build:fe'
        }
      }
    }
    stage("build back_end") {
      steps{
        nodejs("Node-14.16.1") {
          sh 'npm run build:be'
        }
      }
    }
  }
}
