import { CreateUserDto } from '@/presentations/user/dto/create-user.dto';
import { UserModel } from '@/domains/model/user';

export interface UserRepository {
  createUser(createUserDto: CreateUserDto): Promise<UserModel>;
  getAllUsers(): Promise<UserModel[]>;
}
