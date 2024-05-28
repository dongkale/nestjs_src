import winston from 'winston';
import 'winston-daily-rotate-file';
const { combine, timestamp, printf } = winston.format;

const customFormat = printf((info) => {
  return ` ${info.timestamp} ${info.level}: ${info.message}`;
});

export const logger = winston.createLogger({
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    customFormat,
  ),
  transports: [
    new winston.transports.DailyRotateFile({
      level: 'info',
      datePattern: 'YYYY-MM-DD',
      dirname: './logs',
      filename: `server_%DATE%.log`,
      maxSize: '20m',
      maxFiles: '7d',
      zippedArchive: true,
    }),
    new winston.transports.DailyRotateFile({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: './logs',
      filename: `server_%DATE%.error.log`,
      maxSize: '20m',
      maxFiles: '7d',
      zippedArchive: true,
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
  );
}

export const stream = {
  write: (message) => {
    logger.info(message);
  },
};
