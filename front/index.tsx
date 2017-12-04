import * as React from 'react';
import {container} from './container';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'react-datetime/css/react-datetime.css';
import {Router} from './router/Router';
import {Main} from './Main';
import {Store} from './store/Store';
import {InitializeApp} from './core/InitializeApp';

(
  () => {
    const store = container.get<Store>(Store);
    const domRoot = document.getElementById('react-container');
    if (domRoot === null) {
      console.error('Unable to find dom root node #react-container');
      return;
    }
    const location = new URL(document.location.toString());
    store.dispatch(new InitializeApp(
      {
        rootElement: <Main><Router/></Main>,
        domRoot: domRoot,
        browserRoute: {path: location.pathname, query: location.search},
      },
    ));
  }
)();

