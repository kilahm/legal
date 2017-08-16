import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {State} from './store/reducer';
import {Store} from 'redux';
import {Provider} from 'react-redux';
import {container} from './container';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {Router} from './router/Router';


const store = container.get<Store<State>>('store');

ReactDOM.render(
  <Provider store={store}>
    <Router/>
  </Provider>,
  document.getElementById('react-container'),
);
