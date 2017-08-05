import {ContainerModule} from 'inversify';
import {Effects} from './Effects';

export default new ContainerModule(bind => {
  bind<Effects>(Effects).toSelf();
});