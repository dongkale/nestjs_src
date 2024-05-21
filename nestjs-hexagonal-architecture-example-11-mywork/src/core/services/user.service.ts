// src/core/services/UserService.ts
import { UserRepository } from '@/core/ports/user.repository';
import { User } from '@/core/domain/user';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(
    email: string,
    name: string,
    password: string,
  ): Promise<User> {
    const user = new User(0, email, name, password);
    return await this.userRepository.save(user);
  }

  async getUser(id: number): Promise<User | null> {
    return await this.userRepository.findById(id);
  }

  async getUsers(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async updateUser(id: number, user: Partial<User>): Promise<void> {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new Error('User not found');
    }
    const updatedUser = { ...existingUser, ...user };
    await this.userRepository.update(id, updatedUser);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.remove(id);
  }
}
