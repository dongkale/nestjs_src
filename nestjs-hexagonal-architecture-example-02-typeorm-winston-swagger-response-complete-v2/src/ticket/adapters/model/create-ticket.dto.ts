import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTicketDto {
  @ApiProperty({ description: '설명' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: '우선순위' })
  @IsNumber()
  priority: number;

  @ApiProperty({ description: '상태:' })
  @IsString()
  status: string;
}
