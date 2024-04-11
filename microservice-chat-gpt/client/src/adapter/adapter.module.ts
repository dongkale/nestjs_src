import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdapterController } from './adapter.controller';
import { AdapterService } from './adapter.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [],
  controllers: [AdapterController],
  providers: [
    AdapterService,
    {
      provide: 'ADAPTER_TCP_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('TCP_SERVER_HOST'),
            port: configService.get<number>('TCP_SERVER_PORT'),
          },
        });
      },
      inject: [ConfigService],
    },
    {
      provide: 'ADAPTER_NATS_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.NATS,
          options: {
            servers: [configService.get<string>('NATS_SERVER_HOSTS')],
          },
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class AdapterModule {}
