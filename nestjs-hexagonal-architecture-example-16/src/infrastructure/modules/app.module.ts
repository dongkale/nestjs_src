// src/infrastructure/modules/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from '../config/winston.config';
import { getTypeOrmConfig } from '../config/database.config';
import { getJwtConfig } from '../config/jwt.config';
import { UserModule } from './user.module';
import { AuthModule } from './auth.module';
import { TodoModule } from './todo.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmConfig,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
    WinstonModule.forRoot(winstonConfig),
    UserModule,
    AuthModule,
    TodoModule,
  ],
})
export class AppModule {}
