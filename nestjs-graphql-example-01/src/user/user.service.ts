import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const result = await this.userRepository.find();

    return result;
  }

  async create(createUserInput: CreateUserInput): Promise<User> {
    const result = await this.userRepository.save(createUserInput, {
      reload: true,
    });

    return result;
  }
}
