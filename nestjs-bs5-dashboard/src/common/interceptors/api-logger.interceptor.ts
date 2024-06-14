import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MyLoggerService } from '../modules/global/my-logger.service';

/**
 * ApiLoggerInterceptor
 * Logs all incoming requests and
 * Logs all response for the request
 */
@Injectable()
export class ApiLoggerInterceptor implements NestInterceptor {
  constructor(private readonly myLoggerService: MyLoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { statusCode } = context.switchToHttp().getResponse();
    const {
      originalUrl = '',
      method = '',
      params = {},
      query = {},
      body = {},
      headers = {},
    } = req;

    // request data
    const request = {
      originalUrl,
      method,
      params,
      query,
      body,
      headers,
    };

    return next.handle().pipe(
      tap((data) => {
        if (statusCode === HttpStatus.FORBIDDEN) {
          data = null;
        }

        // response data
        const response = {
          statusCode,
          data,
        };

        // log
        this.myLoggerService.apiLog(originalUrl, {
          requestId: req.requestId,
          request,
          response,
        });
      }),
      catchError((err) => {
        this.myLoggerService.apiError(originalUrl, {
          requestId: req.requestId,
          request,
          response: err,
        });

        return throwError(err);
      }),
    );
  }
}
