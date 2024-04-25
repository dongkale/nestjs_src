import { Controller, Get, Param } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  findUserById(@Param('id') id: number): Promise<UserModel> {
    return this.userService.findUserById(id);
  }

//   @Get()
//   users(): Promise<User[]> {
//     return this.userService.users();
//   }

//   @Get(':userId')
//   user(@Param('userId') userId: string): Promise<User> {
//     return this.userService.user(userId);
//   }

}
