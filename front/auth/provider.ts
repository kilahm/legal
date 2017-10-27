import {ContainerModule} from 'inversify';
import {Login} from './effects/Login';
import {Actions} from './Actions';
import {PersistJwt} from './effects/PersistJwt';
import {LoadJwt} from './effects/LoadJwt';
import {RefreshJwt} from './effects/RefreshJwt';

export default new ContainerModule(bind => {
  bind<Login>(Login).toSelf().inSingletonScope();
  bind<Actions>(Actions).toSelf().inSingletonScope();
  bind<PersistJwt>(PersistJwt).toSelf().inSingletonScope();
  bind<LoadJwt>(LoadJwt).toSelf().inSingletonScope();
  bind<RefreshJwt>(RefreshJwt).toSelf().inSingletonScope();
});