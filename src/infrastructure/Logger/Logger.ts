import { Format, TransformableInfo } from 'logform';
import winston, { format } from 'winston';
import {
  ConsoleTransportInstance,
  FileTransportInstance
} from 'winston/lib/winston/transports';

import { ConfigurationInterface } from '../Configuration';
import LoggerInterface from './LoggerInterface';
import { LogColor, LogLevel, LogTags } from './Types';

class Logger implements LoggerInterface {
  private logger: winston.Logger;
  private static readonly COLORS = {
    error: LogColor.ERROR,
    warn: LogColor.WARN,
    info: LogColor.INFO,
    debug: LogColor.DEBUG
  };

  constructor(config: ConfigurationInterface) {
    winston.addColors(Logger.COLORS);
    this.logger = winston.createLogger({
      level: String(config.get('log.level', LogLevel.ERROR)),
      format: Logger.format(),
      transports: Logger.transports()
    });
  }

  public debug(message: string, tags?: LogTags): void {
    this.logger.debug(message, tags);
  }

  public error(message: string, tags?: LogTags): void {
    this.logger.error(message, tags);
  }

  public info(message: string, tags?: LogTags): void {
    this.logger.info(message, tags);
  }

  public warn(message: string, tags?: LogTags): void {
    this.logger.warn(message, tags);
  }

  private static transports(): Array<ConsoleTransportInstance | FileTransportInstance> {
    return [
      new winston.transports.Console(),
      new winston.transports.File({
        filename: 'tmp/logs/error.log',
        level: 'error'
      })
    ];
  }

  private static format(): Format {
    return format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
      winston.format.colorize(),
      winston.format.printf(this.messageTemplate)
    );
  }

  private static messageTemplate(info: TransformableInfo): string {
    const { timestamp, level, message, ...args } = info;
    const tags = Object.keys(args).length ? ` ${JSON.stringify(args, null, 2)}` : '';

    return `[${timestamp}] [${level}]: ${message}${tags}`;
  }
}

export default Logger;
