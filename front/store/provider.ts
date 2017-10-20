import {ContainerModule} from 'inversify';
import {applyMiddleware, createStore, Store} from 'redux';
import {default as reducer, State} from './reducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import {EffectClasses} from '../effects';
import {EffectManager} from './EffectManager';
import {Effect} from './Effect';

export default new ContainerModule(bind => {
  bind<Effect[]>('effects').toDynamicValue(context => {
    return EffectClasses.map(effectClass => context.container.get(effectClass));
  });
  bind<EffectManager>(EffectManager).toSelf();
  bind<Store<State>>('store').toDynamicValue(context => {
    const em = context.container.get<EffectManager>(EffectManager);
    return createStore(
      reducer,
      composeWithDevTools(
        applyMiddleware(
          em.buildMiddleware(),
        ),
      ),
    );
  });
});
