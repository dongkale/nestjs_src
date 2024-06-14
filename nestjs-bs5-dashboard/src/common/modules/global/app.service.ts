import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello from v1';
  }

  getHelloV2(): string {
    return 'Hello from v2';
  }
}
