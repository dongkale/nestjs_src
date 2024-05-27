import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user.module';
import { TodoModule } from './todo.module';
import { AuthModule } from './auth.module';
import { TypeOrmConfigService } from '../config/typeorm.config';
import { WinstonConfigService } from '../config/winston.config';
import { LoggerModule } from 'nestjs-pino';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '../../commons/filters/http-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      useClass: WinstonConfigService,
    }),
    AuthModule,
    UserModule,
    TodoModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
