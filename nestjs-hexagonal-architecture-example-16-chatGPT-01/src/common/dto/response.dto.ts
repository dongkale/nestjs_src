// src/application/dto/response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto<T> {
  @ApiProperty()
  status: string;

  @ApiProperty()
  message: string;

  @ApiProperty({ required: false })
  data?: T;

  constructor(status: string, message: string, data?: T) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}
