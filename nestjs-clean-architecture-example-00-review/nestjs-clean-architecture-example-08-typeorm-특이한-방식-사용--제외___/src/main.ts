import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/main/factories';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  await app.listen(3000);
}

bootstrap().catch((e) => console.log('error', e));
