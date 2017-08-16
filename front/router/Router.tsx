import * as React from 'react';
import {connect} from 'react-redux';
import {State} from '../store/reducer';
import {Landing} from '../landing/Landing';

interface RouterParams {
  route: string;
  loggedIn: boolean;
}

interface Route {
  pattern: RegExp;
  factory: (matches: string[]) => JSX.Element
}

const routes: Route[] = [
  {
    pattern: /\/meetings/,
    factory: () => <h1>Meetings page</h1>,
  },
];

function RouterFn({route}: RouterParams): JSX.Element {
  const view = routes.reduce((result, {pattern, factory}) => {
    if (result !== null) {
      return result;
    }

    const matches = pattern.exec(route);
    if (matches === null) {
      return null;
    }

    return factory(matches.slice(1));
  }, null);

  if (view === null) {
    return <Landing/>;
  }

  return view;
}

export const Router = connect((state: State) => {
  return {
    route: state.router.route,
  };
})(RouterFn);