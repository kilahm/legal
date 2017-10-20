import * as React from 'react';
import {Route} from './router/Router';
import {CreateAdmin} from './user/CreateAdmin';

export const routes: Route[] = [
  {
    pattern: /^\/meetings$/,
    factory: () => <h1>Meetings page</h1>,
  },
  {
    pattern: /^\/createAdmin$/,
    factory: () => <CreateAdmin/>,
  },
];
