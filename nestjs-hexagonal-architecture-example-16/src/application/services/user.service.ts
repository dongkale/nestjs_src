// src/application/services/user.service.ts
import { Injectable } from '@nestjs/common';
import { IUserService } from '@/application/interfaces/iuser.service';
import { IUserRepository } from '@/domain/ports/iuser.repository';
import { User } from '@/domain/entities/user.entity';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getUserById(id: number): Promise<User> {
    return this.userRepository.findById(id);
  }

  async createUser(user: User): Promise<User> {
    return this.userRepository.create(user);
  }
}
