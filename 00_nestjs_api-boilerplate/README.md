## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

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

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

- CRUD(Get, Post, Put, Delete)(Part)
- Typeorm(mysql), typeorm-transactional
- Winston Log(file rotate)
- Swagger
- Custom Exception Filter
- Custom Reponse Format
- Entity Custom Validate Pipe
- interceptor(request log)
- Health Check
- Api-key Check(nestjs/passport)
- Controller, Service Test

## License

Nest is [MIT licensed](LICENSE).
`

# Ref

```bash

- winston

npm i nest-winston winston

npm i winston-daily-rotate-file

- config

# https://www.daleseo.com/nestjs-configuration/


npm i @nestjs/config

- typeorm

# https://jojoldu.tistory.com/568 이름 snake camel
# https://jiwondev.tistory.com/226
# https://blog.naver.com/gi_balja/223054972094

npm i @nestjs/typeorm typeorm mysql2
npm i class-validator class-transformer

# https://www.npmjs.com/package/typeorm-transactional
# https://velog.io/@wndbsgkr/NestJS%EC%97%90%EC%84%9C-Transaction-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0feat.-TypeORM
# https://github.com/odavid/typeorm-transactional-cls-hooked
# https://github.com/Aliheym/typeorm-transactional/tree/master
npm i typeorm-transactional

npm install typeorm reflect-metadata

- typeorm naming strategies

npm install typeorm-naming-strategies --save

- swagger

# https://jhyeok.com/nestjs-swagger/
npm install --save @nestjs/swagger

- swagger api-key

https://stackoverflow.com/questions/73061034/how-to-authorize-multi-api-keys-using-nestjs-swagger-and-useguards

- swagger + 공통 reponse

# https://velog.io/@debug/NestJS-Swagger-Common-Response-Type-%EC%84%A4%EC%A0%95#1-apiresponse%EC%97%90-%EA%B0%84%EB%8B%A8%ED%95%9C-schema-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0
# https://devnm.tistory.com/23?category=1258201
# https://aalonso.dev/blog/2021/how-to-generate-generics-dtos-with-nestjsswagger-422g

- swagger api sort

# https://stackoverflow.com/questions/68529137/sorting-tags-and-operation-in-swagger-ui

- auth : header api-key

# https://stackoverflow.com/questions/72238595/how-to-secure-a-rest-api-with-an-api-key
# https://www.stewright.me/2021/03/add-header-api-key-to-nestjs-rest-api/amp/

npm i passport passport-headerapikey @nestjs/passport --save
npm i @types/passport @types/passport-http --save-dev

added .env
API_KEY=1ab2c3d4e5f61ab2c3d4e5f6

# https://medium.com/@Dee_Mayoor/apikey-authentication-for-nestjs-using-passport-js-6db467fc31f7

- health module

npm install @nestjs/terminus
npm install @nestjs/axios

- class-validator TypeScript Examples

#https://assu10.github.io/dev/2023/03/11/nest-pipe/#3-%EC%9C%A0%ED%9A%A8%EC%84%B1-%EA%B2%80%EC%82%AC-pipe-%EB%A7%8C%EB%93%A4%EA%B8%B0

# https://www.programcreek.com/typescript/?api=class-validator.registerDecorator

- mysql json column

# https://givemethesocks.tistory.com/75
# https://stackoverflow.com/questions/64285189/how-to-save-array-of-json-object-in-postgres-using-typeorm

- health

# https://velog.io/@hong-brother/NestJS-health-api-%EC%B6%94%EA%B0%80

npm install --save @nestjs/termius

- vesioning

# https://www.daleseo.com/nestjs-versioning/

```
