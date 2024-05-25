// src/adapters/controllers/user.controller.ts
import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { IUserService } from '../../application/interfaces/iuser.service';
import { User } from '../../domain/entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: IUserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Post()
  async createUser(@Body() user: User): Promise<User> {
    return this.userService.createUser(user);
  }
}
