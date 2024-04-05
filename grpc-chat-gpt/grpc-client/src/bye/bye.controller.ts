import { Controller, Get } from '@nestjs/common';
import { ByeService } from './bye.service';
import { ByeRequest, ByeResponse } from './interfaces/bye.interface';
import { Observable } from 'rxjs';

@Controller('bye')
export class ByeController {
  constructor(private readonly byeService: ByeService) {}

  @Get()
  getBye(): Observable<ByeResponse> {
    return this.byeService.sayBye('ldk...');
  }
}
