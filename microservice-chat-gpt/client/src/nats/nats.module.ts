import { NatsService } from './nats.service';
import { connect, Payload } from 'ts-nats';
import { Module } from '@nestjs/common';
import { NatsController } from './nats.controller';

@Module({
  imports: [],
  controllers: [NatsController],
  providers: [
    NatsService,
    {
      provide: 'NATS_SERVICE',
      useFactory: async () => {
        const nats = await connect({
          servers: ['nats://localhost:4222'], // NATS 서버의 주소 및 포트
          reconnect: true, // 자동 재접속 활성화
          maxReconnectAttempts: -1, // 무제한 재접속 시도
        });

        nats.on('connect', () => {
          console.log('Connected to NATS server');
        });

        // 연결이 끊어졌을 때 재시도
        nats.on('disconnect', () => {
          console.log('Disconnected from NATS server. Reconnecting...');
        });

        return nats;
      },
    },
  ],
})
export class NatsModule {}
