import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';
import { v4 } from 'uuid';
import { UtilService } from '../../modules/global/util.service';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  constructor(private readonly utilService: UtilService) {}

  use(req: Request, _: any, next: () => void) {
    const requestId = v4();
    this.utilService.setRequestId(requestId);
    req.requestId = requestId;
    next();
  }
}
