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
import {Client} from './api/Client';

const store = container.get<Store<State>>('store');

bootstrap();

function bootstrap() {

  setRouteFromBrowser();

  ReactDOM.render(
    <Provider store={store}>
      <Router/>
    </Provider>,
    document.getElementById('react-container'),
  );

  updateServerState();
}

function setRouteFromBrowser() {
  const routerActions = container.get<RouterActions>(RouterActions);
  const location = new URL(document.location.toString());
  store.dispatch(routerActions.changeRoute(location.pathname, location.search));
}

async function updateServerState() {
  const routerActions = container.get<RouterActions>(RouterActions);
  const api = container.get<Client>(Client);
  const state = await api.getState();
  if (!state.hasAdmin) {
    console.log('setting route to /createAdmin');
    store.dispatch(routerActions.changeRoute('/createAdmin'));
  }
}
