import { Controller } from '@nestjs/common';
import { AppService } from '../app.service';
import { ExampleService } from './example.service';

@Controller('example')
export class ExampleController {
  constructor(
    private service: ExampleService,
    private readonly appService: AppService,
  ) {
    this.appService.subscribeDataRxjs((arg) => {
      console.log('이벤트를받는컨트롤러에서 rxjs 이벤트 수신 : ', arg);
    });

    // this.appService.rxjsObserve.subscribe((arg) => {
    //   console.log('이벤트를받는컨트롤러에서 rxjs 이벤트 수신 : ', arg);
    // });
  }
}
