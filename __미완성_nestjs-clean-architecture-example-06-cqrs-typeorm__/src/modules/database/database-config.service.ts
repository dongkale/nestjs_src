import {
  Config,
  ENV
} from '@/common/infrastructure/configurations/index.config'
import { Inject, Injectable } from '@nestjs/common'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
  constructor(@Inject(ENV) private readonly config: Config) {}
  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.config.DATABASE_HOST,
      port: this.config.DATABASE_PORT,
      username: this.config.DATABASE_USERNAME,
      password: this.config.DATABASE_PASSWORD,
      database: this.config.DATABASE_NAME,
      // entities: [Photo],
      synchronize: false,
      keepConnectionAlive: true,
      retryAttempts: 2,
      retryDelay: 1000
    }
  }
}
