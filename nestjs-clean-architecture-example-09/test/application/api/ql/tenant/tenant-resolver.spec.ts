import { INestApplication } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { Test } from '@nestjs/testing'
import { TenantModule } from '../../../../../src/infrastructure/application/ioc/v0/external/tenant.module'
import * as supertest from 'supertest'
import { MainModule } from '../../../modules/main.module'
import { ApolloDriver } from '@nestjs/apollo'

describe('Testing Tenant Resolver...', () => {
  let app: INestApplication
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        MainModule,
        GraphQLModule.forRoot({
          debug: false,
          playground: false,
          path: '/ql',
          driver: ApolloDriver,
        }),
        TenantModule,
      ],
    }).compile()

    app = module.createNestApplication()
    await app.init()
  })

  // beforeEach(async () => {})

  describe('Hello world query', () => {
    it('should return hello world', async () => {
      const query = `query {
        helloWorld
      }`

      const { body } = await supertest(app.getHttpServer()).post('/ql').send({
        query,
      })

      console.log(body)
    })
  })

  afterAll(async () => {
    await app.close()
  })
})
