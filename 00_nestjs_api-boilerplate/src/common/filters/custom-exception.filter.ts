import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { makeFailCustomResponseDto } from '../response/custom-response.dto';
// import { Request, Response } from 'express';
// import { makeFailApiCustomResponse } from '../response/custom-response.dto';

@Injectable()
export class CustomExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(CustomExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
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
      .json(makeFailCustomResponseDto(status, message, []));

    // if (exception instanceof HttpException) {
    //   response
    //     .status(status)
    //     .json(
    //       makeFailApiCustomResponse(
    //         status,
    //         status !== HttpStatus.INTERNAL_SERVER_ERROR
    //           ? exception['message']['error'] || exception['message'] || null
    //           : 'Internal server error',
    //         [],
    //       ),
    //     );
    // } else {
    //   response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    //     statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    //     message: 'Internal server error',
    //   });
    // }
  }
}
