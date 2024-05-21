import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/core/ports/user.repository';
import { User } from '@/core/domain/user';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@/infrastructure/adapters/persistence/entity/user.entity';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async save(user: User): Promise<User> {
    const userEntity = this.userRepository.create(user);
    const savedUser = await this.userRepository.save(userEntity);
    return new User(
      savedUser.id,
      savedUser.email,
      savedUser.name,
      savedUser.password,
    );
  }

  async findById(id: number): Promise<User | null> {
    const userEntity = await this.userRepository.findOne({ where: { id } });
    if (!userEntity) {
      return null;
    }
    return new User(
      userEntity.id,
      userEntity.email,
      userEntity.name,
      userEntity.password,
    );
  }

  async findAll(): Promise<User[]> {
    const userEntities = await this.userRepository.find();
    return userEntities.map(
      (user) => new User(user.id, user.email, user.name, user.password),
    );
  }

  async update(id: number, user: User): Promise<void> {
    await this.userRepository.update(id, user);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
