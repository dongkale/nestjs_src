import { User } from '@/core/domain/user.entity';

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findOne(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  create(user: User): Promise<User>;
  update(id: string, user: User): Promise<void>;
  delete(id: string): Promise<void>;
}
