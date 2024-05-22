import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { generateSwaggerDocs } from './infraestructure/http-server/utils/generate-swagger-docs';
import { ServerConfig } from './infraestructure/shared/config/server.config';

// function getServerConfig(app: INestApplication): ServerConfig {
//   const config: ConfigService = app.get(ConfigService);
//   return config.get<ServerConfig>('server');
// }

async function bootstrap() {
  const appName = process.env.APP_NAME ?? 'defaultAppName';
  const appPort = process.env.PORT ?? 3000;

  const app = await NestFactory.create(AppModule);

  // const config: ConfigService = app.get(ConfigService);
  // const __port = config.get<ServerConfig>('server')?.port;

  generateSwaggerDocs(app);

  await app.listen(appPort);
}
bootstrap();
