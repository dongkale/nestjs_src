FROM node:18.13.0-bullseye

WORKDIR /dist

RUN apt-get update

RUN npm install -g yarn --force

RUN npm config set registry http://registry.npmjs.org

COPY package.json /dist/package.json

COPY yarn.lock /dist/yarn.lock

RUN yarn

COPY . /dist

RUN yarn build

CMD yarn start:prod

EXPOSE 3100
