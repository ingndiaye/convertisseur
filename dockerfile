FROM jenkins/jenkins:lts

USER root

RUN apt-get update && \
    apt-get install -y docker.io && \
    usermod -aG docker jenkins

USER jenkins
#Récupèrer l'image de apache depuis docker hub
FROM httpd:alpine   
#supprimer le fichier index.htlml
RUN rm -f /usr/local/apache2/htdocs/index.html
#copier tous les fichiers du projet dans le répertoire httdocs 
COPY . /usr/local/apache2/htdocs
# Exposer le port 80 par défaut du conteneur
EXPOSE 80
#Dans le terminal on tape :  docker image build -t convertisseur . 
# verifier l'image : docker image ls -a
# lancer l'application : docker container run --name afmaapp_contener -d -p 8081:80 afma_app