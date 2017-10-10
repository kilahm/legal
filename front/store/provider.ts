import {ContainerModule} from 'inversify';
import {applyMiddleware, createStore, Dispatch, Store} from 'redux';
import {default as reducer, State} from './reducer';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

export default new ContainerModule(bind => {
  bind<Dispatch<State>>('dispatch').toConstantValue(store.dispatch);
  bind<Store<State>>('store').toConstantValue(store);
});
