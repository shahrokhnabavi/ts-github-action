const loggerMock = {
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn()
};

jest.mock('winston', () => ({
  format: {
    colorize: jest.fn(),
    combine: jest.fn(),
    timestamp: jest.fn(),
    printf: jest.fn()
  },
  createLogger: jest.fn().mockReturnValue(loggerMock),
  transports: {
    Console: jest.fn(),
    File: jest.fn()
  },
  addColors: jest.fn()
}));

import * as winston from 'winston';

import { ConfigurationInterface } from '../../../../src/infrastructure/Configuration';
import { Logger } from '../../../../src/infrastructure/Logger';
import { LogColor } from '../../../../src/infrastructure/Logger/Types';

describe('Logger', () => {
  const msgInfo = {
    timestamp: '2022-07-30 09:35:41:3541',
    level: 'debug',
    message: 'message for logs'
  };

  const configMock = {
    get: jest.fn(),
    set: jest.fn()
  } as ConfigurationInterface;

  beforeAll(() => {});
  beforeEach(() => {});

  afterEach(() => {});
  afterAll(() => {});

  test('should build logger with right configs', () => {
    new Logger(configMock);

    expect(winston.addColors).toBeCalledWith({
      error: LogColor.ERROR,
      warn: LogColor.WARN,
      info: LogColor.INFO,
      debug: LogColor.DEBUG
    });
    expect(winston.createLogger).toBeCalledTimes(1);

    expect(winston.transports.Console).toBeCalled();
    expect(winston.transports.File).toBeCalledWith( {"filename": "tmp/logs/error.log", "level": "error"});

    expect(winston.format.combine).toBeCalled();
    expect(winston.format.timestamp).toBeCalledWith({ format: 'YYYY-MM-DD HH:mm:ss:ms' });
    expect(winston.format.colorize).toBeCalled();
    expect(winston.format.printf).toBeCalled();
  });

  test('should call logger methods with arguments', () => {
    const logger = new Logger(configMock);

    const tags = {
      appGroup: 'test',
      id: 10
    };
    logger.debug('message to be logged', tags);
    expect(loggerMock.debug).toBeCalledWith('message to be logged', tags);

    logger.info('message to be logged');
    expect(loggerMock.info).toBeCalled();

    logger.warn('message to be logged');
    expect(loggerMock.warn).toBeCalled();

    logger.error('message to be logged');
    expect(loggerMock.error).toBeCalled();
  });

  test('should see formatted message with tags', () => {
    const tags = {
      appGroup: 'test',
      id: 12
    };
    new Logger(configMock);

    const messageTemplate = (winston.format.printf as jest.Mock).mock.calls[0][0];
    expect(messageTemplate).toEqual(expect.any(Function));

    const formattedTags = JSON.stringify(tags, null, 2);
    expect(messageTemplate({...msgInfo, ...tags}))
      .toBe(`[${msgInfo.timestamp}] [${msgInfo.level}]: ${msgInfo.message} ${formattedTags}`);
  });

  test('should see formatted message without tags', () => {
    new Logger(configMock);

    const messageTemplate = (winston.format.printf as jest.Mock).mock.calls[0][0];

    expect(messageTemplate).toEqual(expect.any(Function));
    expect(messageTemplate(msgInfo))
      .toBe(`[${msgInfo.timestamp}] [${msgInfo.level}]: ${msgInfo.message}`);
  });
});
