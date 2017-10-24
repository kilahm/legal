import {ContainerModule} from 'inversify';
import {CreateUser} from './effects/CreateUser';

export default new ContainerModule(bind => {
  bind<CreateUser>(CreateUser).toSelf().inSingletonScope();
});