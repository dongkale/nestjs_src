import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from 'express';

@Catch(HttpException)
export class SignUpFailedException implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();
    const res = exception.getResponse();

    if (
      exception instanceof BadRequestException
    ) {
      response.render('users/new', {
        csrfToken: request.csrfToken(),
        // csrfToken: request['csrfToken'](),
        validationErrors: res['message'],
        flashMessage: "Something went wrong. Please try again!"
      })
    } else {
      response.redirect('/404')
    }
  }
}
