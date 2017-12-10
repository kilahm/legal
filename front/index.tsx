import * as React from 'react';
import {container} from './container';
import 'react-datetime/css/react-datetime.css';
import 'bulma/css/bulma.css';
import {Store} from './store/Store';
import {InitializeApp} from './core/InitializeApp';
import {App} from './App';

(
  async () => {
    const store = container.get<Store>(Store);
    const contentRoot = document.getElementById('content');
    if (contentRoot === null) {
      console.error('Unable to find root nodes');
      return;
    }
    const location = new URL(document.location.toString());
    await store.dispatch(new InitializeApp(
      {
        contentRoot,
        contentComponent: <App/>,
        browserRoute: {path: location.pathname, query: location.search},
      },
    ));
  }
)();

