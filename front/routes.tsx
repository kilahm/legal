import * as React from 'react';
import {Route} from './router/Router';
import {Landing} from './landing/Landing';

export const routes: Route[] = [
  {
    pattern: /^\/$/,
    factory: () => <Landing/>,
  },
  {
    pattern: /^\/meetings$/,
    factory: () => <h1>Meetings page</h1>,
  },
  {
    pattern: /^\/projects$/,
    factory: () => <h1>Projects page</h1>,
  },
  {
    pattern: /^\/documents$/,
    factory: () => <h1>Documents page</h1>,
  },
];
