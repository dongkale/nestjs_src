import { User } from '@/core/domain/user.entity';
import { CreateUserDto } from '@/application/dto/create-user.dto';
import { UpdateUserDto } from '@/application/dto/update-user.dto';

export interface IUserService {
  getAllUsers(): Promise<User[]>;
  getUserById(id: string): Promise<User>;
  createUser(createUserDto: CreateUserDto): Promise<User>;
  updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User>;
  deleteUser(id: string): Promise<void>;
}
