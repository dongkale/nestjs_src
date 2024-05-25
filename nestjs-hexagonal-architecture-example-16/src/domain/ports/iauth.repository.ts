// src/domain/ports/iauth.repository.ts
import { User } from '../entities/user.entity';

export interface IAuthRepository {
  validateUser(email: string, password: string): Promise<User>;
}

export const IAuthRepository = Symbol('IAuthRepository');
