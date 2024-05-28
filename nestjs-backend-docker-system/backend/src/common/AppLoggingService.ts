import { LoggerService } from "@nestjs/common";
import { logger } from "./logger";

export class AppLoggingService implements LoggerService{
  log(message: string, context: string){
    logger.info(message, {
      from: context
    })
  }
  warn(message: string, context: string){
    logger.warn(message, context);
  }
  error(message: string, trace: string, context: string){
    logger.error(message, {stack:trace, context});
  }
  debug(message: string, context: string){
    logger.debug(message, context);
  }
  verbose(message: string, context: string){
    logger.verbose(message, context);
  }
  // setLogLevels
}