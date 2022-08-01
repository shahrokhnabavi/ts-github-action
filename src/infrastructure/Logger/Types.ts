export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug'
}

export type LogTags = {
  [key: string]: string | number;
};

export enum LogColor {
  ERROR = 'red',
  WARN = 'yellow',
  INFO = 'blue',
  DEBUG = 'white'
}
