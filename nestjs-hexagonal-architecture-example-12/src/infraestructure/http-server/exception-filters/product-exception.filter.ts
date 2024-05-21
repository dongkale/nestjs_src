import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch(ProductApplicationError)
export class ProductCreatorFilter implements ExceptionFilter {
  catch(exception: ProductApplicationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    Logger.error(
      `ProductController (${request.method}) at {${request.path}} error: ${exception.message}`,
    );

    response.status(HttpStatus.BAD_REQUEST).json({
      status: HttpStatus.BAD_REQUEST,
      message: exception.message,
    });
  }
}
