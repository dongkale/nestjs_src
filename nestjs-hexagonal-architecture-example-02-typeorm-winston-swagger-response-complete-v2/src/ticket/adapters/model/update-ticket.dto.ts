import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTicketDto {
  @ApiProperty({ description: '설명' })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: '우선순위' })
  priority: number;

  @ApiProperty({ description: '상태' })
  status: string;
}
