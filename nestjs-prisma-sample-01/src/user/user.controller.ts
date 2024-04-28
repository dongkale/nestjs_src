import { Controller, Get, Param } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //   @Get(':id')
  //   findUserById(@Param('id') id: number): Promise<UserModel> {
  //     return this.userService.findUserById(id);
  //   }

  @Get()
  async users(): Promise<User[]> {
    // const r = await this.userService.users().then((r) => {
    //   // console.log('r:', r);
    //   return r;
    //   }
    // );

    const r = await this.userService.users();

    for (const i of r) {
      console.log('i:', i);
    }
    console.log('r:', r);
    return r;
  }

  //   @Get(':userId')
  //   user(@Param('userId') userId: string): Promise<User> {
  //     return this.userService.user(userId);
  //   }

}
