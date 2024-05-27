import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto<T> {
  @ApiProperty({
    description: '응답 상태값',
  })
  status: string;

  @ApiProperty({
    description: '메세지',
  })
  message: string;

  @ApiProperty({
    description: '반환 데이터',
    type: [],
  })
  data: T;

  constructor(status: string, message: string, data: T) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}
