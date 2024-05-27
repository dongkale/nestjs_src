import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from '@/application/services/user.service';
import { CreateUserDto } from '@/application/dto/create-user.dto';
import { UpdateUserDto } from '@/application/dto/update-user.dto';
import { ResponseDto } from '@/application/dto/response.dto';
import { JwtAuthGuard } from '@/commons/guards/jwt-auth.guard';
import { Response } from 'express';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers(@Res() res: Response) {
    const users = await this.userService.getAllUsers();
    return res
      .status(HttpStatus.OK)
      .json(new ResponseDto('success', 'Users retrieved successfully', users));
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: string, @Res() res: Response) {
    const user = await this.userService.getUserById(id);
    return res
      .status(HttpStatus.OK)
      .json(new ResponseDto('success', 'User retrieved successfully', user));
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const user = await this.userService.createUser(createUserDto);
    return res
      .status(HttpStatus.OK)
      .json(new ResponseDto('success', 'User retrieved successfully', user));
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    const user = await this.userService.updateUser(id, updateUserDto);
    return res
      .status(HttpStatus.OK)
      .json(new ResponseDto('success', 'User updated successfully', user));
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string, @Res() res: Response) {
    await this.userService.deleteUser(id);
    return res
      .status(HttpStatus.OK)
      .json(new ResponseDto('success', 'User deleted successfully', null));
  }
}
