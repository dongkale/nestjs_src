import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from '@/domains/model/user';
import { UserRepository } from '@/domains/repositories/user.repository';
import { CreateUserDto } from '@/presentations/user/dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from '@/infrastructures/entities/user.entity';

@Injectable()
export class UserRepositoryOrm implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<UserModel[]> {
    const users = await this.userRepository.find();
    return users.map((user) => this.toUser(user));
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserModel> {
    const user = new User();
    user.email = createUserDto.email;
    user.name = createUserDto.name;
    user.password = createUserDto.password;
    return this.userRepository.save(user);
  }

  private toUser(userEntity: User): UserModel {
    const user: UserModel = new UserModel();

    user.id = userEntity.id;
    user.email = userEntity.email;
    user.name = userEntity.name;
    user.password = userEntity.password;
    user.created_at = userEntity.created_at;
    user.updated_at = userEntity.updated_at;

    return user;
  }
}
