import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Landing} from './landing/Landing';
import {State} from './store/reducer';
import {Store} from 'redux';
import {Provider} from 'react-redux';
import {container} from './container.js';


const store = container.get<Store<State>>('store');

ReactDOM.render(
  <Provider store={store}>
    <Landing/>
  </Provider>,
  document.getElementById('react-container'),
);
