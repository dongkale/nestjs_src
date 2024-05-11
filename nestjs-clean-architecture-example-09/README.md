<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

Boilerplate of Nestjs using Clean Code Architecture. Provide GraphQL or RestAPI for presenting your app.

## Installation

1. Install dependencies
   ```bash
   $ npm install
   ```
2. setup .env
   ```bash
   $ cp .env.example .env
   ```
3. run database seeder
   ```bash
   $ npm run seed
   ```

## Setup Database

This boilerplate is using postgres out of the box, if you want to change the db driver, you can change it directly in database config module.

```typescript
// src/infrastructure/configs/database.config.ts

type: 'mysql' // or anything supported by typeorm
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

## Helpers

1. Pagination (RestAPI)
2. SearchQuery (RestAPI)
3. Role Guard
4. JWT Guard

don't hesitate to add your own helpers or common things

# Document

- https://gitlab.com/taufikrahadi/nestjs-clean-code-architecture
