import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { AppLoggingService } from './common/AppLoggingService';

async function bootstrap() {
  // express를 사용함을 명시
  const app = await NestFactory.create<NestExpressApplication>(AppModule,{
    logger: new AppLoggingService()
  });
  
  await app.listen(3000);
}
bootstrap();
