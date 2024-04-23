import { AbstractLogger, LogLevel, LogMessage } from 'typeorm';

export class TypeOrmCustomLoggerUtil extends AbstractLogger {
  /**
   * Write log to specific output.
   */
  protected writeLog(
    level: LogLevel,
    logMessage: LogMessage | LogMessage[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // _queryRunner?: QueryRunner,
  ) {
    const messages = this.prepareLogMessages(logMessage, {
      highlightSql: false,
    });

    for (const message of messages) {
      switch (message.type ?? level) {
        case 'log':
        case 'schema-build':
        case 'migration':
          console.log(message.message);
          break;

        case 'info':
        case 'query':
          if (message.prefix) {
            console.log(message.prefix, message.message);
          } else {
            console.log(message.message);
          }
          break;

        case 'warn':
        case 'query-slow':
          if (message.prefix) {
            console.warn(message.prefix, message.message);
          } else {
            console.warn(message.message);
          }
          break;

        case 'error':
        case 'query-error':
          if (message.prefix) {
            console.error(message.prefix, message.message);
          } else {
            console.error(message.message);
          }
          break;
      }
    }
  }
}
