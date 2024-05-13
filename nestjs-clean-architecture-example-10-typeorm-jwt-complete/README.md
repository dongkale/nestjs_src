## Description

Starter [Nest.js](https://github.com/nestjs/nest) in Clean Architecture and TypeScript.
Just a basic Todo task app example.

## Swagger

Swagger is available at : http://localhost:3000/api-docs

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).

## Document

- https://github.com/julienlucas/nestjs-cleanarchi-demo

## Manual

```bash
1. localhost:3000/auth/signup[POST]
{
    "username":"LDK_01",
    "password":"aA123456"
}

2. localhost:3000/auth/signin[POST]
{
    "username":"LDK_01",
    "password":"aA123456"
}

-->

{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkxES18wMSIsImlhdCI6MTcxNTU3MTE1MiwiZXhwIjoxNzE1NTc0NzUyfQ.B-8_yfL7U6n4_Qo9NEPi9EyU-kQ87Lu8O2Ia-17-Tqs"
}

3. localhost:3000/tasks[GET]

Postman : Authorization -> Bearer Token -> Token -> "accessToken" Set

4. localhost:3000/task[POST]

{
    "title":"title_01",
    "description":"abc"
}

4. localhost:3000/tasks
```
