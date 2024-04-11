import { EventsModule } from './events/events.module';
import { MathModule } from './math/math.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [EventsModule, MathModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
