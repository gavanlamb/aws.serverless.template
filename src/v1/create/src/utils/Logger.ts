import { createLogger, format, transports } from 'winston';
export class Logger {
  public static logger =
    process.env.NODE_ENV === 'development'
      ? createLogger({
          format: format.combine(format.splat(), format.simple()),
          level: process.env.LogLevel,
          transports: [
            new transports.File({
              filename: 'logs.log',
            }),
            new transports.Console(),
          ],
        })
      : createLogger({
          format: format.combine(format.splat(), format.json()),
          level: process.env.LogLevel,
          transports: [new transports.Console()],
        });
}
