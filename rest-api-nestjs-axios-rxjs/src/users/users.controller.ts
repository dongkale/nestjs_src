import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { User } from './users.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.userService.getUser(id);
  }

  @Post('add')
  async addUser(@Body() body: User) {
    return await this.userService.addUser(body);
  }

  @Put(':id')
  async updateUser(@Body() body: User, @Param('id') id: string) {
    return await this.userService.updateUser(body, id);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }
}
