import { UserModel } from '@/domains/model/user';
import { UserRepository } from '@/domains/repositories/user.repository';
import { CreateUserDto } from '@/presentations/user/dto/create-user.dto';

export class CreateUserUseCases {
  constructor(private usersRepository: UserRepository) {}

  async execute(createUserDto: CreateUserDto): Promise<UserModel> {
    return this.usersRepository.createUser(createUserDto);
  }
}
