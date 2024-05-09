import { Module } from '@nestjs/common'
import { DatabaseConfigService } from './database-config.service'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigService
    })
  ]
})
export class DatabaseModule {}
