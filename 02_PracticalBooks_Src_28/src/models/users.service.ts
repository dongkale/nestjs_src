import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createOrUpdate(user: User): Promise<User> {
    const hash = await bcrypt.hash(user.getPassword(), 10);
    user.setPassword(hash);
    return this.usersRepository.save(user);
  }

  async login(email: string, password: string): Promise<User> {
    const user = await this.usersRepository.findOne({ email: email });
    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.getPassword());
    if (!isMatch) {
      throw new Error('Invalid password or email');
    }

    return user;
  }
  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  updateBalance(id: number, balance: number) {
    return this.usersRepository.update(id, { balance: balance });
  }
}
