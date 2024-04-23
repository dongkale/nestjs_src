import { Logger } from '@nestjs/common';
import { AbstractLogger, LogLevel, LogMessage /*QueryRunner*/ } from 'typeorm';

export default class TypeOrmCustomLogger extends AbstractLogger {
  private readonly logger = new Logger(TypeOrmCustomLogger.name);

  constructor(options?: any) {
    super(options);
  }

  protected writeLog(
    level: LogLevel,
    logMessage: LogMessage | LogMessage[],
    // queryRunner?: QueryRunner,
  ) {
    const messages = this.prepareLogMessages(logMessage, {
      highlightSql: false,
    });

    for (const message of messages) {
      switch (message.type ?? level) {
        case 'log':
        case 'schema-build':
        case 'migration':
          this.logger.log(`${message.prefix} ${message.message}`);
          break;

        case 'info':
        case 'query':
          this.logger.log(`${message.prefix} ${message.message}`);
          break;

        case 'warn':
        case 'query-slow':
          this.logger.warn(`${message.prefix} ${message.message}`);
          break;

        case 'error':
        case 'query-error':
          this.logger.error(`${message.prefix} ${message.message}`);
          break;
      }
    }
  }
}
