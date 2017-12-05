import {Logger} from './Logger';
import {injectable} from 'inversify';

@injectable()
export class ConsoleLogger implements Logger {
  private static logArgs(...args: any[]) {
    return args.filter(arg => typeof arg !== 'undefined');
  }

  debug(message: string, context?: object): void {
    console.debug(...ConsoleLogger.logArgs(message, context));
  }

  info(message: string, context?: object): void {
    console.info(...ConsoleLogger.logArgs(message, context));
  }

  warn(message: string, context?: object): void {
    console.warn(...ConsoleLogger.logArgs(message, context));
  }

  error(message: string, context?: object): void {
    console.error(...ConsoleLogger.logArgs(message, context));
  }

  critical(message: string, context?: object): void {
    console.error(...ConsoleLogger.logArgs(message, context));
  }
}