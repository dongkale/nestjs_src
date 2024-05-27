// src/domain/ports/iuser.repository.ts
import { User } from '../entities/user.entity';

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User>;
  findByEmail(email: string): Promise<User>;
  create(user: User): Promise<User>;
}

export const IUserRepository = Symbol('IUserRepository');
