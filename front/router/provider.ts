import {ContainerModule} from 'inversify';
import {Actions} from './Actions';
import {FakeHistory} from './FakeHistory';
import {UpdateBrowser} from './effects/UpdateBrowser';

export default new ContainerModule(bind => {
  bind<Actions>(Actions).toSelf();
  bind<History>('history')
    .toDynamicValue(() => window.history)
    .when(() => Boolean(window && window.history));
  bind<History>('history')
    .to(FakeHistory)
    .when(() => !Boolean(window && window.history));
  bind<UpdateBrowser>(UpdateBrowser).toSelf();
});