// src/infrastructure/repositories/typeorm-auth.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IAuthRepository } from '@/domain/ports/iauth.repository';
import { User } from '@/domain/entities/user.entity';

@Injectable()
export class TypeOrmAuthRepository implements IAuthRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.repository.findOne({ where: { email } });
    // Add password validation logic (e.g., bcrypt.compare)
    return user;
  }
}
