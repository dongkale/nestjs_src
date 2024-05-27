import { User } from '../../core/domain/user.entity';

export interface IUserService {
  createUser(email: string, name: string, password: string): Promise<User>;
  findUserByEmail(email: string): Promise<User>;
  validateUser(email: string, password: string): Promise<boolean>;
}
