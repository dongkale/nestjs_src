import { ConfigService } from '@nestjs/config';
import { getAppInstance } from './app.module';
import { ApiLoggerInterceptor } from './common/interceptors/api-logger.interceptor';
import { MyLoggerService } from './common/modules/global/my-logger.service';

async function bootstrap() {
  const app = await getAppInstance();
  const configService = app.get(ConfigService);
  const myLoggerService = app.get(MyLoggerService);
  try {
    /**
     * Set up catch
     * for uncaught exceptions
     */
    process.on('uncaughtException', (error) => {
      myLoggerService.error('uncaughtException', {
        error,
      });
      process.exit(1);
    });

    process.on('SIGTERM', async () => {
      myLoggerService.error('SIGTERM Signal');
      process.exit(1);
    });

    process.on('SIGINT', async () => {
      myLoggerService.error('SIGINT Signal');
      process.exit(1);
    });

    /**
     * Attach loggers
     * Attached here due to e2e test cyclic deps
     */
    // app.useLogger(true);
    app.useGlobalInterceptors(new ApiLoggerInterceptor(myLoggerService));

    const port = configService.get<number>('port');
    await app.listen(port);

    myLoggerService.log(`App listening on port ${port}`);
  } catch (error) {
    myLoggerService.error('Server failed to start', {
      error,
    });
    process.exit(1);
  }
}

bootstrap();
