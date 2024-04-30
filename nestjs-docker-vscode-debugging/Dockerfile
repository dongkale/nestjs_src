FROM node:20.4

ENV NODE_TLS_REJECT_UNAUTHORIZED=0

RUN mkdir -p /nest
ADD . /nest
WORKDIR /nest

RUN npm -g config set strict-ssl false && npm i -g @nestjs/cli && npm i -D concurrently