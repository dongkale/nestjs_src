import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SeederConfig } from '../../../configs/seeder.config'

@Module({
  imports: [
    SeederConfig,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class SeederModule {}
