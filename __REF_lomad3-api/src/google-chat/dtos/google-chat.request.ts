import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString } from 'class-validator';

export class GoogleChatRequest {
  @ApiProperty({
    description: 'The space to send',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  space!: string;

  @ApiProperty({
    description: 'The message to send',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  text!: string;
}
