pipeline {
    agent any

    environment {
        IMAGE_NAME       = "convertisseur-app"
        IMAGE_VERSION    = "1.${BUILD_NUMBER}"
        DOCKER_IMAGE     = "${IMAGE_NAME}:${IMAGE_VERSION}"
        DOCKER_CONTAINER = "convertisseur"
    }

    stages {
        stage("Checkout") {
            steps {
                git branch: 'master', url: 'https://github.com/ingndiaye/convertisseur'
            }
        }

        stage("Build Docker Image") {
            steps {
                sh "docker build -t $DOCKER_IMAGE ."
            }
        }

        stage("Push to Docker Hub") {
            steps {
                withCredentials([usernamePassword(credentialsId: 'afma', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh """
                    docker login -u $DOCKER_USER -p $DOCKER_PASSWORD
                    docker tag $DOCKER_IMAGE $DOCKER_USER/$IMAGE_NAME:$IMAGE_VERSION
                    docker push $DOCKER_USER/$IMAGE_NAME:$IMAGE_VERSION
                    """
                }
            }
        }

        stage("Deploy Container") {
            steps {
                sh """
                docker container stop $DOCKER_CONTAINER || true
                docker container rm $DOCKER_CONTAINER || true
                docker run -d --name $DOCKER_CONTAINER -p 8082:80 $DOCKER_IMAGE
                """
            }
        }
    }
}
