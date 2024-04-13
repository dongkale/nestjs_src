//import { APP_FILTER } from '@nestjs/core';
//import { AllExceptionsFilter } from './item/exception.filter';
import { ItemModule } from './item/item.module';
//import { APP_FILTER } from '@nestjs/core';
//import { AllExceptionsFilter } from './item/exception.filter';
import { Module, Logger, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/logger/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './common/database/database.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RequestLoggerInterceptor } from './common/interceptor/request-logger.interceptor';

@Module({
  imports: [
    ItemModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    DatabaseModule,
    ItemModule,
  ],
  controllers: [AppController],
  providers: [
    /*
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    */
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestLoggerInterceptor,
    },
    Logger,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
