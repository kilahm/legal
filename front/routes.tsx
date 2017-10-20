import * as React from 'react';
import {Route} from './router/Router';

export const routes: Route[] = [
  {
    pattern: /^\/meetings$/,
    factory: () => <h1>Meetings page</h1>,
  },
  {
    pattern: /^\/createAdmin$/,
    factory: () => <h1>Create admin page</h1>,
  },
];
