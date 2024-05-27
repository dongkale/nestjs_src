import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../../application/services/auth.service';
import { AuthCredentialsDto } from '../../application/dto/auth-credentials.dto';
import { ResponseDto } from '../../application/dto/response.dto';
import { Response } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body() authCredentialsDto: AuthCredentialsDto,
    @Res() res: Response,
  ) {
    const user = await this.authService.signUp(authCredentialsDto);
    return res
      .status(HttpStatus.CREATED)
      .json(new ResponseDto('success', 'User registered successfully', user));
  }

  @Post('/signin')
  async signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
    @Res() res: Response,
  ) {
    const result = await this.authService.signIn(authCredentialsDto);
    return res
      .status(HttpStatus.OK)
      .json(new ResponseDto('success', 'User signed in successfully', result));
  }
}
