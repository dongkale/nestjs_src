import { InjectRepository } from '@nestjs/typeorm';
import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import {
  FIND_REPOSITORY_PORT,
  FindUserRepositoryPort,
  UpdateUserDto,
  UpdateUserRepository,
  UserResponseDto,
} from './../../application';
import { User } from '../../domain/entities/user.entity';

import { UserMapper } from '../mappers';
import { UserInternalErrorException } from '../../user-exception';

export class UpdateUserRepositoryAdapter implements UpdateUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @Inject(FIND_REPOSITORY_PORT)
    private readonly findUserRepository: FindUserRepositoryPort,
  ) {}

  async update(
    id: string,
    dto: UpdateUserDto,
  ): Promise<UserResponseDto | null> {
    try {
      const entity = await UserMapper.toUpdateEntity(dto);
      const response = await this.userRepository.update(id, entity);
      if (response) {
        return this.findUserRepository.findUserByid(id);
      }
      return null;
    } catch (error) {
      throw new UserInternalErrorException();
    }
  }

  async updateStatus(
    id: string,
    status: boolean,
  ): Promise<UserResponseDto | null> {
    try {
      const response = await this.userRepository.update(id, { status });
      if (response) {
        return this.findUserRepository.findUserByid(id);
      }
      return null;
    } catch (error) {
      throw new UserInternalErrorException();
    }
  }
}
