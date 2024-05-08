import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';

import { DatabaseModule } from './libs/DatabaseModule';
import { MessageModule } from './libs/MessageModule';
import { RequestStorageMiddleware } from './libs/RequestStorageMiddleware';

import { AppController } from './AppController';
import { AppService } from './AppService';
import { AccountsModule } from './account/AccountsModule';
import { NotificationModule } from './notification/NotificationModule';

@Module({
  imports: [
    AccountsModule,
    DatabaseModule,
    MessageModule,
    CacheModule.register({ isGlobal: true }),
    ThrottlerModule.forRoot(),
    NotificationModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestStorageMiddleware).forRoutes('*');
  }
}
