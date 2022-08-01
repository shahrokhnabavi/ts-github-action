import { LogTags } from './Types';

export default interface LoggerInterface {
  error(message: string, tags?: LogTags): void;
  info(message: string, tags?: LogTags): void;
  warn(message: string, tags?: LogTags): void;
  debug(message: string, tags?: LogTags): void;
}
