import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ByeRequest, ByeResponse } from './interfaces/bye.interface';

@Controller()
export class ByeController {
  @GrpcMethod('ByeProtoService', 'sayBye')
  sayBye(request: ByeRequest): ByeResponse {
    console.log(`===[request] sayBye()`);
    return { message: `안녕, ${request.name}님!` };
  }
}
