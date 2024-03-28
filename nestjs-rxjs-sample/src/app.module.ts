import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExampleController } from './example/example.controller';
import { ExampleService } from './example/example.service';
import { HttpModule } from '@nestjs/axios';
import { RxjsTestService } from './rxjs-test/rxjs-test.service';
import { RxjsTestController } from './rxjs-test/rxjs-test.controller';

import { EventSubscribeHandler } from './event-subscribe/event-subscribe';

@Module({
  imports: [HttpModule],
  controllers: [AppController, ExampleController, RxjsTestController],
  providers: [
    AppService,
    ExampleService,
    RxjsTestService,
    EventSubscribeHandler,
  ],
})
export class AppModule {}
