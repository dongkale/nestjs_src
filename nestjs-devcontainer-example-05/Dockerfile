
# 베이스 이미지로 Ubuntu 20.04 사용
FROM ubuntu:20.04

# install nodejs
RUN apt-get -qq update
RUN apt-get -qq upgrade --yes 
RUN apt-get -qq install curl --yes
RUN curl -sL -k https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get -qq install nodejs --yes

RUN npm config set strict-ssl false
RUN npm update -g npm
RUN npm i -g @nestjs/cli

USER node
WORKDIR /home/node/app

COPY --chown=node:node . .

RUN npm install

EXPOSE 3000