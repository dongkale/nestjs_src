<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

## Description

Stack:

1. [Nest](https://github.com/nestjs/nest)
2. Sequelize (ORM)
3. JWT
4. Bcrypt
5. Clean Architecture

![clean-image](https://i.imgur.com/O6JMSux.png)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Hace falta añadir las variables de entorno DATABASE_PASSWORD y JWT_SECRET, se puede añadir creando un fichero .env en el directorio principal

## Running the app with docker

```bash
# docker build
$ docker build -t kubide .

# docker run
$ docker run -e JWT_SECRET=secret -e DATABASE_PASSWORD=password -p 8080:3000 kubide
```

## Document

https://github.com/mc-arenas/nestjs-cleanArchitecture.git

## Manual

```bash
1. localhost:3000/auth/register[POST][Authorization:NoAuth]
{
    "name":"name01",
    "role":"CLIENT",
    "email":"arb@abc.com",
    "password":"password01"
}

2. localhost:3000/auth/login[POST]
{
    "name":"name01",
    "role":"CLIENT",
    "email":"arb@abc.com",
    "password":"password01"
}

-->

{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkNMSUVOVCIsImlhdCI6MTcxNTU4OTcxNywiZXhwIjoxNzE1NjI1NzE3fQ.CvALkGTi8P794C07ZtVgqZYGQmTdI1voMIqI5KIGmh4"
}

3. localhost:3000/user[GET][Authorization:Bearer Token]

Postman : Authorization -> Bearer Token -> Token -> "accessToken" Set

4. localhost:3000/user/1[GET][Authorization:Bearer Token]

Postman : Authorization -> Bearer Token -> Token -> "accessToken" Set

5. localhost:3000/message[GET][Authorization:Bearer Token]

Postman : Authorization -> Bearer Token -> Token -> "accessToken" Set

6. localhost:3000/message[POST][Authorization:Bearer Token]
{
    "content":"content01",
    "receiverUserId":1,
    "userId":1
}

Postman : Authorization -> Bearer Token -> Token -> "accessToken" Set
```
