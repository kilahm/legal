import * as React from 'react';
import {container} from './container';
import 'react-datetime/css/react-datetime.css';
import 'bulma/css/bulma.css';
import {Store} from './store/Store';
import {InitializeApp} from './core/InitializeApp';
import {Menu} from './menu/Menu';
import {Router} from './router/Router';

(
  async () => {
    const store = container.get<Store>(Store);
    const navRoot = document.getElementById('main-nav');
    const contentRoot = document.getElementById('content');
    if (navRoot === null || contentRoot === null) {
      console.error('Unable to find root nodes');
      return;
    }
    const location = new URL(document.location.toString());
    await store.dispatch(new InitializeApp(
      {
        navRoot,
        navComponent: <Menu/>,
        contentRoot,
        contentComponent: <Router/>,
        browserRoute: {path: location.pathname, query: location.search},
      },
    ));
  }
)();

