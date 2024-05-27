import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@/infrastructure/modules/user.module';
import { TodoModule } from '@/infrastructure/modules/todo.module';
import { AuthModule } from '@/infrastructure/modules/auth.module';
import { TypeOrmConfigService } from '@/infrastructure/config/typeorm.config';
import { WinstonConfigService } from '@/infrastructure/config/winston.config';
import { LoggerModule } from 'nestjs-pino';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@/commons/guards/jwt.strategy';

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
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    TodoModule,
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
