import {ContainerModule} from 'inversify';
import {default as reducer, State} from '../reducer';
import {EffectClasses} from '../effects';
import {Store} from './Store';
import {Log} from './effects/Log';

export default new ContainerModule(bind => {
  bind<Store>(Store).toDynamicValue(context => {
    const effects = EffectClasses.map(effectClass => context.container.get(effectClass));
    return new Store(effects, reducer);
  }).inSingletonScope();

  bind<() => () => State>('getStateFactory')
    .toDynamicValue(context => () => {
      const store = context.container.get<Store>(Store);
      return store.getState.bind(store);
    });

  bind<Log>(Log).toSelf().inSingletonScope();
});
