ARG NODE_VER
FROM node:${NODE_VER}

RUN npm config set strict-ssl false
RUN npm update -g npm
RUN npm i -g @nestjs/cli

USER node
WORKDIR /home/node/app

COPY --chown=node:node . .

RUN npm config set strict-ssl false && npm install

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]