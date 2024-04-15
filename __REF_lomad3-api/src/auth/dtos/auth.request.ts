import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString } from 'class-validator';

export class AuthRequest {
  @ApiProperty({
    example: 'kakao',
    description: 'The oauth provider',
  })
  @IsString()
  @IsNotEmpty()
  vendor!: string;

  @ApiProperty({
    example: '1234567890',
    description: 'The code from the login provider',
  })
  @IsString()
  @IsNotEmpty()
  code!: string;

  @ApiProperty({
    example: 'https://lomad.kr/oauth/callback/kakao',
    description: 'The redirect uri',
  })
  @IsString()
  @IsNotEmpty()
  redirectUri!: string;
}
