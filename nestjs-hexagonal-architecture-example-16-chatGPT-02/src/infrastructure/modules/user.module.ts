import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '@/application/services/user.service';
import { UserController } from '@/infrastructure/controllers/user.controller';
import { UserRepository } from '@/core/repositories/user.repository';
import { User } from '@/core/domain/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UserService,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
