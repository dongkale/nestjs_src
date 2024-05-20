import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { TransformInterceptor } from './infrastructure/common/interceptors/transform.interceptor';
import * as figlet from 'figlet';

async function bootstrap() {
  console.log(
    figlet.textSync('NestJS Server', {
      font: 'Cyberlarge',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 200,
      whitespaceBreak: true,
    }),
  );

  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Task management API')
    // .setDescription('Nest.js API')
    .setVersion('1.0')
    .addServer('http://localhost:3000/', 'Local environment')
    // .addServer('https://staging.yourapi.com/', 'Staging')
    // .addServer('https://production.yourapi.com/', 'Production')
    .addTag('Your API Tag')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  const port = process.env.PORT;
  SwaggerModule.setup('api-docs', app, document);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(port);

  logger.log(`Application listening on port ${port}`);
}
bootstrap();
