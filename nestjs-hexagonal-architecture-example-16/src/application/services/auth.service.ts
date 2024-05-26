// src/application/services/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IAuthService } from '@/application/interfaces/iauth.service';
import { IAuthRepository } from '@/domain/ports/iauth.repository';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '@/application/dto/auth.dto';
import { User } from '@/domain/entities/user.entity';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly authRepository: IAuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.authRepository.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async login(user: LoginDto): Promise<{ access_token: string }> {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
