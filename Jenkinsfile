pipeline {
    agent {
        docker {
            image 'docker:latest'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }

    environment {
        IMAGE_VERSION    = "1.${BUILD_NUMBER}"
        DOCKER_IMAGE     = "projet_grp4-app:${IMAGE_VERSION}"
        DOCKER_CONTAINER = "projet_grp4"
    }

    stages {
        stage("recuprer code source") {
            steps {
                git branch: 'master', url: 'https://github.com/ingndiaye/convertisseur'
            }
        }

        stage("Test") {
            steps {
                echo "Tests en cours"
            }
        }

        stage("Build Docker Image") {
            steps {
                script {
                    sh "docker build -t $DOCKER_IMAGE ."
                }
            }
        }

        stage("Push image to Docker Hub") {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'afma', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh """
                        echo \$DOCKER_PASSWORD | docker login -u \$DOCKER_USER --password-stdin
                        echo 'Docker login successful'
                        docker tag $DOCKER_IMAGE \$DOCKER_USER/$DOCKER_IMAGE
                        docker push \$DOCKER_USER/$DOCKER_IMAGE
                        """
                    }
                }
            }
        }

        stage("Deploy App") {
            steps {
                script {
                    sh """
                    docker container stop $DOCKER_CONTAINER || true
                    docker container rm $DOCKER_CONTAINER || true
                    docker run -d --name $DOCKER_CONTAINER -p 8082:80 $DOCKER_IMAGE
                    """
                }
            }
        }
    }
}
