// src/application/interfaces/iuser.service.ts
import { User } from '@/domain/entities/user.entity';

export interface IUserService {
  getAllUsers(): Promise<User[]>;
  getUserById(id: number): Promise<User>;
  createUser(user: User): Promise<User>;
}

export const IUserService = Symbol('IUserService');
