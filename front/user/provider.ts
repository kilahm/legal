import {ContainerModule} from 'inversify';
import {CreateAdmin} from './effects/CreateAdmin';

export default new ContainerModule(bind => {
  bind<CreateAdmin>(CreateAdmin).toSelf().inSingletonScope();
});