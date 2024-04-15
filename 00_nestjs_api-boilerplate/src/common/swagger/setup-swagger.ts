import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

/**
 * Swagger 세팅
 *
 * @param {INestApplication} app
 */
export function setupSwagger(app: INestApplication, basePrefix: string): void {
  const options = new DocumentBuilder()
    .setTitle('NestJS Study API Docs')
    .setDescription('NestJS Study API description')
    .setVersion('1.0.0')
    .setContact('Lee Dong Kwan', '', 'dklee@lennon.co.kr')
    .setLicense('Apache 2.0', 'ttp://www.apache.org/licenses/LICENSE-2.0.html')
    .addServer(basePrefix)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
}
