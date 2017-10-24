import * as React from 'react';
import {State} from './store/reducer';
import {Store} from 'redux';
import {Provider} from 'react-redux';
import {container} from './container';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {Router} from './router/Router';
import {Actions as CoreActions} from './core/Actions';
import {Main} from './Main';


(
  () => {
    const store = container.get<Store<State>>('store');
    const domRoot = document.getElementById('react-container');
    if (domRoot === null) {
      console.error('Unable to find dom root node #react-container');
      return;
    }
    const location = new URL(document.location.toString());
    store.dispatch(CoreActions.initializeApp(
      <Provider store={store}>
        <Main>
          <Router/>
        </Main>
      </Provider>,
      domRoot,
      {path: location.pathname, query: location.search},
    ));
  }
)();

