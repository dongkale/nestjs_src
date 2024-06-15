import { ConfigModule, ConfigService } from '@nestjs/config';
import { globalConfig } from '@/configs/global-config';
import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '@/configs/typeorm-config';
import { TodoModule } from '@/todo/todo.module';
import { LoggerMiddleware } from '@/commons/logger/logger.middleware';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RequestLoggerInterceptor } from '@/commons/interceptor/request-logger.interceptor';
import { TypeormModule } from './configs/database-config';

@Module({
  imports: [
    ConfigModule.forRoot(globalConfig),
    // TypeOrmModule.forRoot(typeOrmConfig),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: typeOrmConfig,
    // }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: typeOrmConfig,
    // }),
    TypeormModule.forRoot(),
    TodoModule,
  ],
  providers: [
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
