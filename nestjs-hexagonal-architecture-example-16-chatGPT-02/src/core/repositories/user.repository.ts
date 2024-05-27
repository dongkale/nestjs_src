import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserRepository } from '../interfaces/user-repository.interface';
import { User } from '../domain/user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async findOne(id: string): Promise<User> {
    return this.repository.findOne({ where: { id: id } });
  }

  async findByEmail(email: string): Promise<User> {
    return this.repository.findOne({ where: { email } });
  }

  async create(user: User): Promise<User> {
    return this.repository.save(user);
  }

  async update(id: string, user: User): Promise<void> {
    await this.repository.update(id, user);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
