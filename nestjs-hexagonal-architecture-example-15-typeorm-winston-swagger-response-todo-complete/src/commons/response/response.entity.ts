import { TodoEntity } from '@/modules/todo/domain/todo.entity';
import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { GetTodosResponse } from '@/todo/application/port/in/dto/response/get-todos-response.dto';

export class ResponseEntity<T> {
  @ApiProperty({
    description: '반환 데이터',
    type: [GetTodosResponse],
    name: 'data',
  })
  @Exclude()
  private readonly _data: T;

  @ApiProperty({
    description: '메세지',
    name: 'message',
  })
  @Exclude()
  private readonly _message: string;

  @ApiProperty({
    description: '응답 상태값(0: success, 1: fail)',
    name: 'code',
  })
  @Exclude()
  private readonly _code: number;

  private constructor(status: HttpStatus, data: T, message: string) {
    this._data = data;
    this._message = message;
    this._code = status;
  }

  static OK(): ResponseEntity<string> {
    return new ResponseEntity<string>(HttpStatus.OK, '', 'Success');
  }

  static OK_WITH<T>(data: T): ResponseEntity<T> {
    return new ResponseEntity<T>(HttpStatus.OK, data, 'Success');
  }

  static CREATED_WITH<T>(data: T): ResponseEntity<T> {
    return new ResponseEntity<T>(HttpStatus.CREATED, data, 'Success');
  }

  static ERROR(): ResponseEntity<string> {
    return new ResponseEntity<string>(
      HttpStatus.INTERNAL_SERVER_ERROR,
      '',
      '서버 에러가 발생했습니다.',
    );
  }

  static ERROR_WITH(
    message: string,
    code: HttpStatus = HttpStatus.BAD_REQUEST,
  ): ResponseEntity<string> {
    return new ResponseEntity<string>(code, '', message);
  }

  static ERROR_WITH_DATA<T>(
    message: string,
    code: HttpStatus = HttpStatus.BAD_REQUEST,
    data: T,
  ): ResponseEntity<T> {
    return new ResponseEntity<T>(code, data, message);
  }

  @Expose()
  get message(): string {
    return this._message;
  }

  @Expose()
  get data(): T {
    return this._data;
  }

  @Expose()
  get code(): number {
    return this._code;
  }
}
