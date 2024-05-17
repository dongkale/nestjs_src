import { WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';
import * as winstonDaily from 'winston-daily-rotate-file';

export const winstonLogger = (appName: string) => {
  return WinstonModule.createLogger({
    level: 'silly',
    transports: [
      new winstonDaily({
        filename: `logs/${appName}.%DATE%.log`,
        maxFiles: 30,
        zippedArchive: false,
        maxSize: '20m',
        format: winston.format.combine(
          winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
          }),
          winston.format.errors({ stack: true }),
          winston.format.splat(),
          winston.format.printf((info) => {
            const { timestamp, level, message, stack, ...args } = info;

            const levelString = level.toUpperCase().padEnd(5);
            const stackString = stack ? '- ' + stack : '';
            const callModule = args.context ? '[' + args.context + ']' : '';

            return `[${timestamp}][${levelString}]${callModule} ${message} ${stackString}`;
          }),
        ),
      }),
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          utilities.format.nestLike(appName, {
            colors: true,
            prettyPrint: true,
          }),
        ),
      }),
    ],
  });
};
