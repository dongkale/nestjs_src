// src/infrastructure/modules/auth.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/domain/entities/user.entity';
import { AuthService } from '@/application/services/auth.service';
import { TypeOrmAuthRepository } from '@/infrastructure/repositories/typeorm-auth.repository';
import { AuthController } from '@/adapters/controllers/auth.controller';
import { IAuthRepository } from '@/domain/ports/iauth.repository';
import { IAuthService } from '@/application/interfaces/iauth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule],
  controllers: [AuthController],
  providers: [
    {
      provide: IAuthService,
      useClass: AuthService,
    },
    {
      provide: IAuthRepository,
      useClass: TypeOrmAuthRepository,
    },
  ],
})
export class AuthModule {}
