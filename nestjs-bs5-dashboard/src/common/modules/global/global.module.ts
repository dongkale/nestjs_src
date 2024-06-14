import { Global, Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MyLoggerService } from './my-logger.service';
import { UtilService } from './util.service';

@Global()
@Module({
  providers: [AppService, MyLoggerService, UtilService],
  exports: [AppService, MyLoggerService, UtilService],
})
export class GlobalModule {}
