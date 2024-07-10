import { Expose } from "class-transformer";
import { IsDate, IsEmail, IsNotEmpty } from "class-validator";

export class UserDto {
  @Expose()
  @IsNotEmpty()
  readonly id: Number;

  @Expose()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @Expose()
  @IsDate()
  readonly created_at: Date;

  @Expose()
  @IsDate()
  readonly updated_at: Date;
}
