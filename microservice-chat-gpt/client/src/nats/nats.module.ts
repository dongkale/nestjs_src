import { NatsService } from './nats.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { connect, Payload } from 'ts-nats';
import { Module } from '@nestjs/common';
import { NatsController } from './nats.controller';

@Module({
  imports: [ConfigModule],
  controllers: [NatsController],
  providers: [
    NatsService,
    {
      provide: 'NATS_SERVICE',
      useFactory: async (configService: ConfigService) => {
        const nats = await connect({
          servers: [configService.get<string>('NATS_SERVER_HOSTS')], // NATS 서버의 주소 및 포트
          reconnect: true, // 자동 재접속 활성화
          maxReconnectAttempts: -1, // 무제한 재접속 시도
          pingInterval: 5000, // 10초마다 핑을 보냄
        });

        nats.on('connect', (s) => {
          console.log('Connected to NATS server ');
          console.log(s.protocolHandler.currentServer);
        });

        // 연결이 끊어졌을 때 재시도
        nats.on('disconnect', () => {
          console.log('Disconnected from NATS server. Reconnecting...');
        });

        nats.on('ping', () => {
          console.log('ping');
        });

        nats.on('pong', () => {
          console.log('pong');
        });

        return nats;
      },
      inject: [ConfigService],
    },
  ],
})
export class NatsModule {}
