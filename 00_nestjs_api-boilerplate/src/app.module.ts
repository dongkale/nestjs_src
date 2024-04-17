import { APP_FILTER } from '@nestjs/core';
// import { HttpExceptionFilter } from './common/filters/http-Exception.filter';
//import { APP_FILTER } from '@nestjs/core';
//import { AllExceptionsFilter } from './item/exception.filter';
import { PartModule } from './part/part.module';
//import { APP_FILTER } from '@nestjs/core';
//import { AllExceptionsFilter } from './item/exception.filter';
import { Module, Logger, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/logger/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './common/database/database.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './common/auth/auth.module';
import { RequestLoggerInterceptor } from './common/interceptor/request-logger.interceptor';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    AuthModule,
    DatabaseModule,
    HealthModule,
    PartModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Logger,
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter,
    // },
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestLoggerInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
