pipeline{
    agent any

    environment {
        GITHUB_CREDENTIAL = 'NAME_OF_YOUR_GITHUB_token'
        GIT_BRANCH = 'main'
        DOCKERHUB_CREDENTIAL = 'dockerhub-credential'  // ID from Jenkins credentials
        DOCKERTAG = "${env.BUILD_ID}"
    }

    stages{
        stage ('Check') {
            steps {
                sh '''
                    docker version
                '''
            }
        }

        stage ('Build') {
            steps{
                sh '''
                    docker build -t YOUR_DOCKERHUB_IMAGE ./client
                '''
            }
        }  

        stage ('Login to DockerHub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: env.DOCKERHUB_CREDENTIAL, 
                                                     usernameVariable: 'DOCKERHUB_USERNAME', 
                                                     passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                        sh """
                        echo "$DOCKERHUB_PASSWORD" | docker login -u "$DOCKERHUB_USERNAME" --password-stdin
                        """
                    }
                }
            }
        }

        stage ('Push Docker Image to DockerHub') {
            steps {
                script {
                    // Push the Docker image to DockerHub
                    docker.withRegistry('https://index.docker.io/v1/', "${DOCKERHUB_CREDENTIAL}") {
                        docker.image("YOUR_DOCKERHUB_IMAGE").push("${DOCKERTAG}")
                    }
                }
            }
        }

        stage ('Update deployment YAML') {
            steps {
                script {
                    sh "sed -i 's+YOUR_DOCKERHUB_IMAGE.*+YOUR_DOCKERHUB_IMAGE:${DOCKERTAG}+g' k8s/app-deployment.yaml"
                }
            }
        } 
        stage ('Commit and Push Changes') {
            steps {
                withCredentials([usernamePassword(credentialsId: GITHUB_CREDENTIAL, usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_PASSWORD')]) {
                    sh """
                        git config user.name YOUR_NAME
                        git config user.email YOUR_EMAIL
                        git add *
                        git commit -m "Update manifest"
                        git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/${GIT_USERNAME}/YOUR_GIT_NAME.git HEAD:main
                    """
                }
            }
        // argo must be running in k8s cluster for monitoring and deploying
        }  
    }
    //double check
    post {
        success {
            echo 'Successfully deploy app^^'
            slackSend botUser: true, channel: 'open', color: '#29f7a9', message: 'Successfully deploy app (～￣▽￣)～', teamDomain: 'Stella', tokenCredentialId: 'slack-token', username: 'Jenkins'
        }
        failure {
            echo 'Deployment failed'
            slackSend botUser: true, channel: 'open', color: '#e80238', message: 'Deploying app failed ≡(▔﹏▔)≡. Deleted current deployment...', teamDomain: 'Stella', tokenCredentialId: 'slack-token', username: 'Jenkins'
        }
        always{
            sh 'echo "Exit stage"'
            sh "docker logout"
            // sh 'docker system prune -a --volumes -f'
        }
    }
}