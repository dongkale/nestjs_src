import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { interval } from 'rxjs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const subscription = interval(1000).subscribe({
  //   next(num) {
  //     console.log(num);
  //   },
  //   complete() {
  //     // Will not be called, even when cancelling subscription.
  //     console.log('completed!');
  //   },
  // });

  // setTimeout(() => {
  //   subscription.unsubscribe();
  //   console.log('unsubscribed!');
  // }, 2500);

  await app.listen(3000);
}
bootstrap();
