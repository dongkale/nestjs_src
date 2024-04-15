import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { Response } from 'express';
import { makeFailApiCustomResponse } from '../response/custom-response.dto';

@Catch(EntityNotFoundError, Error)
export class EntityNotFoundExceptionFilter implements ExceptionFilter {
  public catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // return response.status(404).json({
    //   message: {
    //     statusCode: 404,
    //     error: 'Not Found',
    //     message: exception.message,
    //   },
    // });

    const status = 404;

    return response
      .status(status)
      .json(makeFailApiCustomResponse(status, 'Not Found', []));
  }
}
