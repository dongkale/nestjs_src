import { User } from '@/core/domain/user';

export interface UserRepository {
  save(user: User): Promise<User>;
  findById(id: number): Promise<User | null>;
  findAll(): Promise<User[]>;
  update(id: number, user: User): Promise<void>;
  remove(id: number): Promise<void>;
}
