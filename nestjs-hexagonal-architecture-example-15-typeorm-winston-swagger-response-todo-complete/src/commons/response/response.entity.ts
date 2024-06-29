import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { CommonTodoResponse } from '@/todo/application/port/in/dto/response/common-todo-response.dto';
// import { Http } from 'winston/lib/winston/transports';

export declare enum ResponseResult {
  SUCCESS = 0,
  FAIL = 1,
}

export class ResponseEntity<T> {
  @ApiProperty({
    description: '반환 데이터',
    type: [CommonTodoResponse],
    name: 'data',
  })
  @Exclude()
  private readonly _data: T;

  @ApiProperty({
    description: '응답 상태 메세지(성공: Success, 실패: 실패 메세지)',
    name: 'message',
    default: 'Success',
  })
  @Exclude()
  private readonly _message: string;

  @ApiProperty({
    // description: '응답 상태값(0: Success, 1: Fail)',
    description: `응답 상태값[HttpStatus](성공: ${HttpStatus.OK}, 실패: 실패 코드)`,
    name: 'code',
    default: HttpStatus.OK,
  })
  @Exclude()
  private readonly _code: number;

  private constructor(status: HttpStatus, message: string, data: T) {
    this._code = status;
    this._message = message;
    this._data = data;
  }

  static Ok<T>(data: T = new Object() as T): ResponseEntity<T> {
    return new ResponseEntity<T>(HttpStatus.OK, 'Success', data);
  }

  static Error<T>(
    message: string,
    code: HttpStatus = HttpStatus.BAD_REQUEST,
    data: T,
  ): ResponseEntity<T> {
    return new ResponseEntity<T>(code, message, data);
  }

  // static Created<T>(data: T = new Object() as T): ResponseEntity<T> {
  //   return new ResponseEntity<T>(HttpStatus.CREATED, 'Success', data);
  // }

  // static OK(): ResponseEntity<string> {
  //   return new ResponseEntity<string>(HttpStatus.OK, 'Success', '');
  // }

  // static OK_WITH<T>(data: T): ResponseEntity<T> {
  //   return new ResponseEntity<T>(HttpStatus.OK, 'Success', data);
  // }

  // static CREATED_WITH<T>(data: T): ResponseEntity<T> {
  //   return new ResponseEntity<T>(HttpStatus.CREATED, 'Success', data);
  // }

  static ERROR(): ResponseEntity<string> {
    return new ResponseEntity<string>(
      HttpStatus.INTERNAL_SERVER_ERROR,
      'Internal Server Error',
      '',
    );
  }

  static ERROR_WITH(
    message: string,
    code: HttpStatus = HttpStatus.BAD_REQUEST,
  ): ResponseEntity<string> {
    return new ResponseEntity<string>(code, message, '');
  }

  static ERROR_WITH_DATA<T>(
    message: string,
    code: HttpStatus = HttpStatus.BAD_REQUEST,
    data: T,
  ): ResponseEntity<T> {
    return new ResponseEntity<T>(code, message, data);
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
