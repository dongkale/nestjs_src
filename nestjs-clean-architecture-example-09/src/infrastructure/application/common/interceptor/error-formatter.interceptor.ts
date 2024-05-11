import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common'
import { catchError, Observable, throwError } from 'rxjs'

@Injectable()
export class ErrorFormatter implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError((err) => {
        const error = this.mapHttpError(err)

        return throwError(error)
      }),
    )
  }

  mapHttpError(err: any) {
    if (err instanceof HttpException) {
      if (err instanceof InternalServerErrorException) {
        return new InternalServerErrorException({
          error: err.getResponse(),
          data: err.message,
          stack: process.env.NODE_ENV === 'dev' ? err.stack : '',
        })
      }

      return err
    }

    return err
  }
}
