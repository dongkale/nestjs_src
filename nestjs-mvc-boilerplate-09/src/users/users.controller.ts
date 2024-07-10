import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Render,
  Request,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AuthExceptionFilter } from '@/common/filters/auth-exceptions.filter';
import { AuthenticatedGuard } from '@/common/guards/authenticated.guard';
import { toUserDto } from '@/common/mapper';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { SignUpFailedException } from '@/users/filters/sign-up-failed-exceptions.filter';
import { UsersService } from '@/users/users.service';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @UseFilters(SignUpFailedException)
  @Post()
  async createUser(
    @Request() req,
    @Res() res,
    @Body() createUserDto: CreateUserDto,
  ) {
    const user = await this.usersService.createUser(createUserDto);

    if (user) {
      const userDto = toUserDto(user);
      req.logIn(userDto, (err) => {
        if (err) {
          this.logger.debug(err);
        }
      });
    }

    res.redirect(`/users/${user.id}`);
  }

  @UseGuards(AuthenticatedGuard)
  @UseFilters(AuthExceptionFilter)
  @Get(':id')
  @Render('users/show')
  async profile(@Request() req, @Param() param) {
    if (req.user.id == param.id) {
      return {
        user: req.user,
        // csrfToken: req.csrfToken()
      };
    }
  }
}
