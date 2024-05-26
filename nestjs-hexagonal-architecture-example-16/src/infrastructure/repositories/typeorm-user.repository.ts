// src/infrastructure/repositories/typeorm-user.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserRepository } from '@/domain/ports/iuser.repository';
import { User } from '@/domain/entities/user.entity';

@Injectable()
export class TypeOrmUserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.repository.find();
    return users;
  }

  async findById(id: number): Promise<User> {
    const user = await this.repository.findOne({ where: { id: id } });
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async create(user: User): Promise<User> {
    return this.repository.save(user);
  }
}
