import { ApiProperty } from '@nestjs/swagger';

import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class CancelMyOrderRequest {
  @ApiProperty({ description: '취소 사유', example: '취소 사유' })
  @Expose()
  @IsString()
  reason: string;

  @ApiProperty({ description: '기타 취소 사유', example: '기타 취소 사유' })
  @Expose()
  @IsString()
  etcReason?: string;

  @ApiProperty({ description: '취소 사유 상세', example: '취소 사유 상세' })
  @Expose()
  @IsString()
  detailReason?: string;
}
