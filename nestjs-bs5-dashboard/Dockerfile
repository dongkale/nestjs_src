FROM node:18.13.0-bullseye

WORKDIR /app

RUN apt-get update

RUN npm install -g yarn --force

RUN npm config set registry http://registry.npmjs.org

ADD package.json /app/package.json

ADD yarn.lock /app/yarn.lock

RUN yarn

ADD . /app

EXPOSE 5900 9229
