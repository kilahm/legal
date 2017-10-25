import {ContainerModule} from 'inversify';
import {Login} from './effects/Login';
import {Actions} from './Actions';
import {PersistJwt} from './effects/PersistJwt';

export default new ContainerModule(bind => {
  bind<Login>(Login).toSelf().inSingletonScope();
  bind<Actions>(Actions).toSelf().inSingletonScope();
  bind<PersistJwt>(PersistJwt).toSelf().inSingletonScope();
});