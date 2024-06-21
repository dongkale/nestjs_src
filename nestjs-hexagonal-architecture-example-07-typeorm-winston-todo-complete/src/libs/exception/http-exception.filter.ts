import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { Response } from 'express';
import { CustomValidationError } from '@/libs/exception/custom-validation-error';
import { instanceToPlain } from 'class-transformer';
import { ResponseEntity } from '@/libs/response/response.entity';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const message = exception.message;
    const responseBody = exception.getResponse() as any;

    // const exceptionCheckOptions = {
    //   status,
    //   message,
    //   responseBody,
    // };

    // const responseEntity = this.exceptionChecker(exceptionCheckOptions);
    const responseEntity = this.exceptionChecker(status, message, responseBody);

    response.status(status).json(instanceToPlain(responseEntity));
  }

  toCustomValidationErrorByNest(
    responseBody: ValidationError,
  ): CustomValidationError {
    return new CustomValidationError(responseBody);
  }

  // exceptionChecker({ status, message, responseBody }) {
  exceptionChecker(status: number, message: string, responseBody: any) {
    let responseEntity: ResponseEntity<string | object>;

    switch (status) {
      case 400:
        const isValidationError = responseBody instanceof ValidationError;

        responseEntity = ResponseEntity.ERROR_WITH_DATA<
          CustomValidationError[]
        >(
          message,
          HttpStatus.BAD_REQUEST,
          isValidationError
            ? [this.toCustomValidationErrorByNest(responseBody)]
            : (responseBody.message as CustomValidationError[]),
        );
        break;

      case 401:
        responseEntity = ResponseEntity.ERROR_WITH(
          message,
          HttpStatus.UNAUTHORIZED,
        );
        break;

      case 404:
        responseEntity = ResponseEntity.ERROR_WITH(
          message,
          HttpStatus.NOT_FOUND,
        );
        break;

      case 500:
        responseEntity = ResponseEntity.ERROR();
        break;

      default:
        responseEntity = ResponseEntity.ERROR_WITH(message, status);
        break;
    }

    return responseEntity;
  }
}
