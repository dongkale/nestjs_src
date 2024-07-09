import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class RequestLoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger(RequestLoggerInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.logger.log('>>>>>');

    const now = Date.now();

    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;
    const query = request.query;
    const body = request.body;

    const logMessage = {
      message: `${method} ${url} REQUEST`,
      query,
      body,
    };

    this.logger.log(`Request: ${JSON.stringify(logMessage, null, 2)}`);

    return next.handle().pipe(
      tap((data) => {
        this.logger.log(`Response: ${JSON.stringify(data, null, 2)}`);
        this.logger.log(`<<<<< [${Date.now() - now}ms]`);
      }),
    );
  }
}
