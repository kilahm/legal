import {ContainerModule} from 'inversify';
import {Client} from './Client';
import {FetchHttp, Http} from './Http';

export default new ContainerModule(bind => {
  bind<Client>(Client).toSelf().inSingletonScope();
  bind<Http>('Http').to(FetchHttp).inSingletonScope();
});