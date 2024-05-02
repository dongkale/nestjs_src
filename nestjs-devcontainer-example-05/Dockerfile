ARG NODE_VER
FROM node:${NODE_VER}

ENV NODE_TLS_REJECT_UNAUTHORIZED=0

RUN npm config set strict-ssl false
RUN npm update -g npm
RUN npm i -g @nestjs/cli

USER root
WORKDIR /app

# COPY --chown=node:node . .
COPY . .

RUN npm config set strict-ssl false && npm install

EXPOSE 3000

# CMD [ "npm", "run", "start:dev" ]