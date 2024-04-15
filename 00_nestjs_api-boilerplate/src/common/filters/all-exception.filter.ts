import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { makeFailApiCustomResponse } from '../response/custom-response.dto';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response
      .status(status)
      .json(
        makeFailApiCustomResponse(
          status,
          status !== HttpStatus.INTERNAL_SERVER_ERROR
            ? exception['message']['error'] || exception['message'] || null
            : 'Internal server error',
          [],
        ),
      );
  }
}
