import {ContainerModule} from 'inversify';
import {InitializeApp} from './effects/InitializeApp';
import {nullStorage} from './NullStorage';
import {PendingEntityManager} from './PendingEntityManager';
import {ShowErrors} from './effects/ShowErrors';

export default new ContainerModule(bind => {
  bind<InitializeApp>(InitializeApp).toSelf().inSingletonScope();
  bind<Storage>('localStorage')
    .toConstantValue(localStorage)
    .when(() => localStorage !== undefined);
  bind<Storage>('localStorage')
    .toConstantValue(nullStorage)
    .when(() => localStorage === undefined);
  bind<PendingEntityManager>(PendingEntityManager).toSelf().inSingletonScope();
  bind<ShowErrors>(ShowErrors).toSelf().inSingletonScope();
});
