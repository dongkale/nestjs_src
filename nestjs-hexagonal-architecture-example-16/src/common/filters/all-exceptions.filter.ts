// src/commons/filters/all-exceptions.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from 'winston';
import { ResponseDto } from '../dto/response.dto';

// @Catch()
// export class AllExceptionsFilter implements ExceptionFilter {
//   constructor(private readonly logger: Logger) {}

//   catch(exception: unknown, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const request = ctx.getRequest<Request>();
//     const response = ctx.getResponse<Response>();
//     const status =
//       exception instanceof HttpException
//         ? exception.getStatus()
//         : HttpStatus.INTERNAL_SERVER_ERROR;

//     const message =
//       exception instanceof HttpException ? exception.getResponse() : exception;

//     this.logger.error(`[${request.method}] ${request.url}`, exception);

//     response.status(status).json({
//       statusCode: status,
//       timestamp: new Date().toISOString(),
//       path: request.url,
//       message,
//     });
//   }
// }
// @Catch()
// export class AllExceptionsFilter implements ExceptionFilter {
//   constructor(private readonly logger: Logger) {}

//   catch(exception: unknown, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const request = ctx.getRequest<Request>();
//     const response = ctx.getResponse<Response>();
//     const status =
//       exception instanceof HttpException
//         ? exception.getStatus()
//         : HttpStatus.INTERNAL_SERVER_ERROR;

//     const message =
//       exception instanceof HttpException ? exception.getResponse() : exception;

//     this.logger.error(`[${request.method}] ${request.url}`, exception);

//     response
//       .status(status)
//       .json(new ResponseDto<null>(false, null, message.toString()));
//   }
// }

// @Catch()
// export class AllExceptionsFilter implements ExceptionFilter {
//   constructor(private readonly logger: Logger) {}

//   catch(exception: unknown, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const request = ctx.getRequest<Request>();
//     const response = ctx.getResponse<Response>();
//     const status =
//       exception instanceof HttpException
//         ? exception.getStatus()
//         : HttpStatus.INTERNAL_SERVER_ERROR;

//     const message =
//       exception instanceof HttpException ? exception.getResponse() : exception;

//     this.logger.error(`[${request.method}] ${request.url}`, { exception });

//     response
//       .status(status)
//       .json(new ResponseDto<null>(false, null, message.toString()));
//   }
// }

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException ? exception.getResponse() : exception;

    response
      .status(status)
      .json(
        new ResponseDto(
          'error',
          message['message'] || 'Internal server error',
          null,
        ),
      );
  }
}
