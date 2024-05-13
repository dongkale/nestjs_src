import { UserModel } from '@/domains/model/user';
import { UserRepository } from '@/domains/repositories/user.repository';

export class GetAllUserUseCases {
  constructor(private usersRepository: UserRepository) {}

  async execute(): Promise<UserModel[]> {
    return await this.usersRepository.getAllUsers();
  }
}
