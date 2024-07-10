import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class FlashMessageCsrfInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const req = context.switchToHttp().getRequest()

    return next
      .handle()
      .pipe(
        map((data) => {
          return {
            ...data,
            csrfToken: req.csrfToken(),
            flashMessage: req.flash('alert')[0]
          }
        })
      )
  }
}
