import {
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
// import { Request, Response } from 'express';
import { ResponseDto, ResponseStatus } from '@/commons/response/response.dto';

// @Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const message = exception.message;
    const stack = exception.stack;

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    this.logger.error(`[Exception] message: ${message}`, stack);

    response
      .status(status)
      .json(new ResponseDto(ResponseStatus.FAIL, message, ''));
  }
}
