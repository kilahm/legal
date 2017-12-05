import {Logger} from './Logger';

export class NullLogger implements Logger {
  debug(): void {
  }

  info(): void {
  }

  warn(): void {
  }

  error(): void {
  }

  critical(): void {
  }
}