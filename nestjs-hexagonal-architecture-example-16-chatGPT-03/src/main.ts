import { NestFactory } from '@nestjs/core';
import { AppModule } from './infrastructure/modules/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WinstonConfigService } from './infrastructure/config/winston.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = app.get(WinstonConfigService);
  app.useLogger(logger);

  const config = new DocumentBuilder()
    .setTitle('Hexagonal Architecture API')
    .setDescription('API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
