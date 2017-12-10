import {Effect} from '../../store/Effect';
import {inject, injectable} from 'inversify';
import {ShowError} from '../actions/ShowError';
import {Action} from '../../store/Action';
import {State} from '../../reducer';
import {LOGGER} from '../../logging/provider';
import {Logger} from '../../logging/Logger';

@injectable()
export class ShowErrors implements Effect {
  constructor(@inject(LOGGER) private logger: Logger) {
  }

  async run(next: () => Promise<State>, action: Action<any>): Promise<void> {
    if (action instanceof ShowError) {
      this.logger.error('User visible error', action.payload);
    }
    await next();
  }
}