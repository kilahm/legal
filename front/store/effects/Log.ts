import {LOGGER} from '../../logging/provider';
import {inject, injectable} from 'inversify';
import {Logger} from '../../logging/Logger';
import {Effect} from '../Effect';
import {State} from '../../reducer';
import {Action} from '../Action';

@injectable()
export class Log implements Effect {
  constructor(@inject(LOGGER) private logger: Logger) {
  }

  async run(next: () => Promise<State>, action: Action<any>): Promise<void> {
    const context = {
      type: action.constructor.name,
      payload: action.payload,
    };
    this.logger.debug('Dispatching action', context);
    await next();
    this.logger.debug('Done dispatching action', context);
  }
}