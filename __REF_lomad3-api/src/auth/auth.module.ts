import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ApiKeyStrategy } from './api-key/api-key.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [
    // PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [ApiKeyStrategy, JwtStrategy, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
