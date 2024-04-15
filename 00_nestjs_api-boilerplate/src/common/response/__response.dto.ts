import { ApiProperty } from '@nestjs/swagger';

export class __ResponseDto<T> {
  @ApiProperty({ example: true, description: '성공 여부' })
  result: boolean;

  @ApiProperty({ example: true, description: '상태 코드' })
  status: number;

  @ApiProperty({ description: '메시지' })
  message: string;

  @ApiProperty({ description: '데이터' })
  data: T;

  constructor(result: boolean, status: number, message: string, data: T) {
    this.result = result;
    this.status = status;
    this.message = message;
    this.data = data;
  }
}
