// src/commons/interceptors/response.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseDto } from '../dto/response.dto';

// @Injectable()
// export class ResponseInterceptor<T>
//   implements NestInterceptor<T, ResponseDto<T>>
// {
//   intercept(
//     context: ExecutionContext,
//     next: CallHandler<T>,
//   ): Observable<ResponseDto<T>> {
//     return next.handle().pipe(
//       map((data) => {
//         return new ResponseDto<T>(true, data);
//       }),
//     );
//   }
// }

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ResponseDto<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseDto<T>> {
    return next
      .handle()
      .pipe(
        map(
          (data) => new ResponseDto<T>('success', 'Request successful', data),
        ),
      );
  }
}
