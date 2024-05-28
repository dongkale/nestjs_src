import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto<T> {
  @ApiProperty({
    description: '응답 상태값(0: success, 1: fail)',
  })
  status: number;

  @ApiProperty({
    description: '메세지',
  })
  message: string;

  @ApiProperty({
    description: '반환 데이터',
    type: [],
  })
  data: T;

  constructor(status: number, message: string, data: T) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}

export enum ResponseStatus {
  OK = 0,
  FAIL = 1,
}

export enum ResponseMessage {
  SUCCESS = 'success',
}
