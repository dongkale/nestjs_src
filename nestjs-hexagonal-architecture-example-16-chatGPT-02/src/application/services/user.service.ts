import { Injectable, NotFoundException } from '@nestjs/common';
import { IUserService } from '@/core/interfaces/user-service.interface';
import { IUserRepository } from '@/core/interfaces/user-repository.interface';
import { CreateUserDto } from '@/application/dto/create-user.dto';
import { UpdateUserDto } from '@/application/dto/update-user.dto';
import { User } from '@/core/domain/user.entity';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.email = createUserDto.email;
    user.name = createUserDto.name;
    user.password = createUserDto.password; // Hashing should be applied here
    return this.userRepository.create(user);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    user.name = updateUserDto.name || user.name;
    user.password = updateUserDto.password || user.password; // Hashing should be applied here
    await this.userRepository.update(id, user);
    return this.userRepository.findOne(id);
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.userRepository.delete(id);
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findByEmail(email);
  }

  async validateUser(email: string, password: string): Promise<boolean> {
    const user = await this.findUserByEmail(email);
    if (!user) {
      return false;
    }
    return bcrypt.compare(password, user.password);
  }
}
