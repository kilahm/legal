import {ContainerModule} from 'inversify';
import {Logger} from './Logger';
import {ConsoleLogger} from './ConsoleLogger';

export const LOGGER = Symbol('logger');
export default new ContainerModule(bind => {
  bind<Logger>(LOGGER).to(ConsoleLogger);
})