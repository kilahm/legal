import {ContainerModule} from 'inversify';
import {FakeHistory} from './FakeHistory';
import {UpdateBrowser} from './effects/UpdateBrowser';

export default new ContainerModule(bind => {
  bind<History>('history')
    .toDynamicValue(() => window.history)
    .inSingletonScope()
    .when(() => Boolean(window && window.history));
  bind<History>('history')
    .to(FakeHistory)
    .inSingletonScope()
    .when(() => !Boolean(window && window.history));
  bind<UpdateBrowser>(UpdateBrowser).toSelf();
});