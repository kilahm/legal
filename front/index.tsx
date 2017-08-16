import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {State} from './store/reducer';
import {Store} from 'redux';
import {Provider} from 'react-redux';
import {container} from './container';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {Router} from './router/Router';
import {Actions as RouterActions} from './router/Actions';

const store = container.get<Store<State>>('store');

if (document && document.location) {
  const routerActions = container.get<RouterActions>(RouterActions);
  store.dispatch(routerActions.updateRoute(document.location.toString()));
}

ReactDOM.render(
  <Provider store={store}>
    <Router/>
  </Provider>,
  document.getElementById('react-container'),
);
