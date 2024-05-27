// src/infrastructure/modules/user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/domain/entities/user.entity';
import { UserService } from '@/application/services/user.service';
import { TypeOrmUserRepository } from '@/infrastructure/repositories/typeorm-user.repository';
import { UserController } from '@/adapters/controllers/user.controller';
import { IUserRepository } from '@/domain/ports/iuser.repository';
import { IUserService } from '@/application/interfaces/iuser.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    {
      provide: IUserService,
      useClass: UserService,
    },
    {
      provide: IUserRepository,
      useClass: TypeOrmUserRepository,
    },
  ],
})
export class UserModule {}
