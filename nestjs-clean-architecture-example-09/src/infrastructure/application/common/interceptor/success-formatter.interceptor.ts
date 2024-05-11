import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Response } from 'express'
import { catchError, map, Observable, throwError } from 'rxjs'

export interface SuccessResponse<T> {
  status: number
  message: string
  data: T
}

@Injectable()
export class ResponseFormatter<T>
  implements NestInterceptor<T, SuccessResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<SuccessResponse<T>> | Promise<Observable<SuccessResponse<T>>> {
    const response = context.switchToHttp().getResponse()
    const message = this.parseResponseMessage(response)

    return next
      .handle()
      .pipe(map((data) => ({ data, message, status: response.statusCode })))
  }

  parseResponseMessage(response: Response) {
    const statusCode = response.statusCode

    return Object.keys(HttpStatus).find(
      (status) => HttpStatus[status as keyof typeof HttpStatus] === statusCode,
    )
  }
}
