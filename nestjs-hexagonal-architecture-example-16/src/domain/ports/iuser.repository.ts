// src/domain/ports/iuser.repository.ts
import { User } from '../entities/user.entity';

export interface IUserRepository {
  findById(id: number): Promise<User>;
  findByEmail(email: string): Promise<User>;
  create(user: User): Promise<User>;
}
