import {ContainerModule} from 'inversify';
import {Actions} from './Actions';
import {FakeHistory} from './FakeHistory';

export default new ContainerModule(bind => {
  bind<Actions>(Actions).toSelf();
  bind<History>('history').toFactory<History>(() => () => {
    if (window && window.history) {
      return window.history;
    }
    return new FakeHistory();
  });
});