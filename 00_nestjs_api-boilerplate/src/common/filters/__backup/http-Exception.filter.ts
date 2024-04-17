import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { makeFailCustomResponseDto } from '../../response/custom-response.dto';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // response.status(status).json({
    //   statusCode: status,
    //   timestamp: new Date().toISOString(),
    //   path: request.url,
    // });

    // const errorResponse = {
    //   code: status,
    //   timestamp: new Date().toISOString(),
    //   path: request.url,
    //   method: request.method,
    //   message:
    //     status !== HttpStatus.INTERNAL_SERVER_ERROR
    //       ? exception['message']['error'] || exception['message'] || null
    //       : 'Internal server error',
    // };

    // const errorResponse = new CommonResponse(
    //   status,
    //   'Error',
    //   exception.message || 'Internal Server Error',
    // );
    // response.status(status).json({
    //   result_code: status,
    //   result_message:
    //     status !== HttpStatus.INTERNAL_SERVER_ERROR
    //       ? exception['message']['error'] || exception['message'] || null
    //       : 'Internal server error',
    //   result_data: [],
    // });

    response
      .status(status)
      .json(
        makeFailCustomResponseDto(
          status,
          status !== HttpStatus.INTERNAL_SERVER_ERROR
            ? exception['message']['error'] || exception['message'] || null
            : 'Internal server error',
          [],
        ),
      );
  }
}
