import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TodoPersistenceModule } from '@/todo/adaptor/out-persistence/todo-persistence.module';
import { TodoWebModule } from '@/todo/adaptor/in-web/todo-web.module';
import { getTypeOrmConfig } from '@/configs/database.config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RequestLoggerInterceptor } from '@/commons/interceptor/request-logger.interceptor';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmConfig,
    }),
    TodoPersistenceModule,
    TodoWebModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestLoggerInterceptor,
    },
  ],
})
export class AppModule {}
