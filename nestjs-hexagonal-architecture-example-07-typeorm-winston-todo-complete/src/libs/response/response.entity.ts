// import { TodoEntity } from '@/todo/domain/todo.entity';
import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
// import { GetTodosResponse } from '@/todo/application/port/in/dto/response/get-todos-response.dto';
// import { UpdateTodoOutboundPortOutputDto } from '@/todo/outbound-port/update-todo.outbound-port.interface';

export class ResponseEntity<T> {
  @ApiProperty({
    description: '응답 상태값(0: success, 1: fail)',
    name: 'code',
  })
  @Exclude()
  private readonly _code: number;

  @ApiProperty({
    description: '메세지',
    name: 'message',
  })
  @Exclude()
  private readonly _message: string;

  @ApiProperty({
    description: '반환 데이터',
    type: [Object],
    name: 'data',
  })
  @Exclude()
  private readonly _data: T;

  private constructor(status: HttpStatus, message: string, data: T) {
    this._code = status;
    this._message = message;
    this._data = data;
  }

  static Ok<T>(data: T = new Object() as T): ResponseEntity<T> {
    return new ResponseEntity<T>(HttpStatus.OK, 'Success', data);
  }

  static Created<T>(data: T = new Object() as T): ResponseEntity<T> {
    return new ResponseEntity<T>(HttpStatus.CREATED, 'Success', data);
  }

  static OK(): ResponseEntity<string> {
    return new ResponseEntity<string>(HttpStatus.OK, 'Success', '');
  }

  static OK_WITH<T>(data: T): ResponseEntity<T> {
    return new ResponseEntity<T>(HttpStatus.OK, 'Success', data);
  }

  static CREATED_WITH<T>(data: T): ResponseEntity<T> {
    return new ResponseEntity<T>(HttpStatus.CREATED, 'Success', data);
  }

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
  get code(): number {
    return this._code;
  }

  @Expose()
  get message(): string {
    return this._message;
  }

  @Expose()
  get data(): T {
    return this._data;
  }
}
