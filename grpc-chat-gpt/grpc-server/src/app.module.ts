import { ByeModule } from './bye/bye.module';
import { HelloModule } from './hello/hello.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ByeModule, HelloModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
