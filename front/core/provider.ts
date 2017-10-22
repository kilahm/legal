import {ContainerModule} from 'inversify';
import {InitializeApp} from './effects/InitializeApp';

export default new ContainerModule(bind => {
  bind<InitializeApp>(InitializeApp).toSelf().inSingletonScope();
})
