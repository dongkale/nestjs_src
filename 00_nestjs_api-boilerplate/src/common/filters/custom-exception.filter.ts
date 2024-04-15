import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { makeFailApiCustomResponse } from '../response/custom-response.dto';
// import { Request, Response } from 'express';
// import { makeFailApiCustomResponse } from '../response/custom-response.dto';

@Injectable()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const message = exception.message;

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    console.log('exception: ', message);

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
