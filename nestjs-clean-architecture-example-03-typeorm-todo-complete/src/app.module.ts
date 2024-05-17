import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
// import { LoggerModule } from '@/infrastructure/logger/logger.module';
import { ExceptionsModule } from '@/infrastructure/exceptions/exceptions.module';
import { UsecasesProxyModule } from '@/infrastructure/usecases-proxy/usecases-proxy.module';
import { ControllersModule } from '@/infrastructure/controllers/controllers.module';
import { BcryptModule } from '@/infrastructure/services/bcrypt/bcrypt.module';
import { JwtModule as JwtServiceModule } from '@/infrastructure/services/jwt/jwt.module';
import { EnvironmentConfigModule } from '@/infrastructure/config/environment-config/environment-config.module';
import { ConfigService } from '@nestjs/config';
// import * as dotenv from 'dotenv';

// dotenv.config();

@Module({
  imports: [
    PassportModule,
    // JwtModule.register({
    //   secret: process.env.JWT_SECRET,
    //   signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME },
    // }),
    JwtModule.registerAsync({
      // 비동기적으로 JWT 모듈을 설정
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        expiresIn: Number(configService.get<string>('JWT_EXPIRATION_TIME')),
      }),
      inject: [ConfigService],
    }),
    // LoggerModule,
    ExceptionsModule,
    UsecasesProxyModule.register(),
    ControllersModule,
    BcryptModule,
    JwtServiceModule,
    EnvironmentConfigModule,
  ],
  providers: [],
})
export class AppModule {}
