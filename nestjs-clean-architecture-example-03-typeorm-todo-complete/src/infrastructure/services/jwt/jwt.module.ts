import { Module } from '@nestjs/common';
import { JwtModule as JWT } from '@nestjs/jwt';
import { JwtTokenService } from './jwt.service';
import { ConfigService } from '@nestjs/config';

// import * as dotenv from 'dotenv';

// dotenv.config();

@Module({
  imports: [
    // Jwt.register({
    //   secret: process.env.JWT_SECRET,
    //   signOptions: { expiresIn: '24h' },
    // }),
    JWT.registerAsync({
      // 비동기적으로 JWT 모듈을 설정
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        expiresIn: Number(configService.get<string>('JWT_EXPIRATION_TIME')),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [JwtTokenService],
  exports: [JwtTokenService],
})
export class JwtModule {}
