import { Injectable } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { toUserDto } from 'src/common/mapper';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(email, password): Promise<any> {
    const user = await this.usersService.findUserByEmail(email);

    if (user && (await this.isCorrectPassword(user, password))) {
      return toUserDto(user);
    }

    return null;
  }

  async isCorrectPassword(user: User, password: string): Promise<boolean> {
    const result = await compare(password, user.password);
    return result;
  }
}
