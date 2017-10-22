import {ContainerModule} from 'inversify';
import {Login} from './effects/Login';
import {Actions} from './Actions';

export default new ContainerModule(bind => {
  bind<Login>(Login).toSelf().inSingletonScope();
  bind<Actions>(Actions).toSelf().inSingletonScope();
});