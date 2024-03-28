import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import hbs from 'hbs';
import { join } from 'path';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { Logger, ValidationPipe } from '@nestjs/common';
import { environment, port as appPort } from '@/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const port = appPort || 4000;

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.use(helmet());
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            validationError: { target: false },
        }),
    );

    if (environment) {
        app.enableCors();

        const swaggerBuilder = new DocumentBuilder()
            .setTitle('NestJs MVC Boilerplate')
            .setDescription('NestJs MVC boilerplate description')
            .addBearerAuth()
            .addServer('http://localhost:4000')
            .build();
        const docs = SwaggerModule.createDocument(app, swaggerBuilder);
        SwaggerModule.setup('/docs', app, docs);
    }

    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    hbs.registerPartials(join(__dirname, '..', 'views', 'partials'));
    app.set('view options', { layout: 'index' });
    app.setViewEngine('hbs');

    await app.listen(port);
    Logger.log(`Server running on port: ${port}`, 'bootstrap');
}

bootstrap();
