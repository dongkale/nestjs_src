import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { SeederModule } from './infrastructure/application/ioc/seeder/seeder.module'

export async function bootstrap() {
  NestFactory.createApplicationContext(SeederModule)
    .then(async (appContext) => {
      const logger = new Logger('SEEDER')
      logger.debug('Starting Seeder')

      appContext.close()
    })
    .catch((err) => {
      throw err
    })
}

bootstrap()
