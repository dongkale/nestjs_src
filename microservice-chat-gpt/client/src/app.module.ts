import { AdapterModule } from './adapter/adapter.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NatsModule } from './nats/nats.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    AdapterModule,
    NatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
