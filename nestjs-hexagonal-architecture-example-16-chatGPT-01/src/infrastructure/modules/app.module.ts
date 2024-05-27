// src/infrastructure/modules/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from '@/infrastructure/config/winston.config';
import { getTypeOrmConfig } from '@/infrastructure/config/database.config';
import { getJwtConfig } from '@/infrastructure/config/jwt.config';
import { UserModule } from '@/infrastructure/modules/user.module';
import { AuthModule } from '@/infrastructure/modules/auth.module';
import { TodoModule } from '@/infrastructure/modules/todo.module';

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
