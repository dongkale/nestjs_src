// src/application/interfaces/iauth.service.ts
import { User } from '@/domain/entities/user.entity';
import { LoginDto } from '@/application/dto/auth.dto';

export interface IAuthService {
  validateUser(email: string, password: string): Promise<User>;
  login(user: LoginDto): Promise<{ access_token: string }>;
}

export const IAuthService = Symbol('IAuthService');
