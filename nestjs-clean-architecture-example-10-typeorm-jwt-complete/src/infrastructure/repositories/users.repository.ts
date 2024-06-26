import { DataSource, Repository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from '@domain/entities/user.interface';
import { AuthCrendentialsDto } from '@infrastructure/controllers/auth/auth-credential.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(authCrendentialsDto: AuthCrendentialsDto): Promise<void> {
    const { username, password } = authCrendentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log('salt', salt);
    console.log('hashedPassword', hashedPassword);

    const user = this.create({ username, password: hashedPassword });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        console.error(error);
        throw new ConflictException('Username already exists');
      } else {
        console.error(error);
        throw new InternalServerErrorException();
      }
    }
  }
}
