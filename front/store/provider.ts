import {ContainerModule} from 'inversify';
import {applyMiddleware, createStore, Dispatch, Store} from 'redux';
import {default as reducer, State} from './reducer';
import thunk from 'redux-thunk';

const store = createStore(
  reducer,
  applyMiddleware(thunk),
);

export default new ContainerModule(bind => {
  bind<Dispatch<State>>('dispatch').toFunction(store.dispatch);
  bind<Store<State>>('store').toConstantValue(store);
});
