import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Unique } from "src/common/validator/unique.validator";
import { User } from "../entities/user.entity";

export class CreateUserDto {
  @IsEmail()
  @Unique(User)
  readonly email: string;

  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
}
