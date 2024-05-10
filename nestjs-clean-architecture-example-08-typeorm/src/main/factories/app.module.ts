import { UserModule } from '@/main/factories'

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({ keepConnectionAlive: true }),
    UserModule
  ]
})
export class AppModule {}
