import * as React from 'react';
import {connect} from 'react-redux';
import {State} from '../store/reducer';
import {Landing} from '../landing/Landing';
import {routes} from '../routes';

interface RouterParams {
  path: string | null;
  query: URLSearchParams | null,
  loggedIn: boolean;
}

export interface Route {
  pattern: RegExp;
  factory: (matches: RegExpExecArray, query: URLSearchParams) => JSX.Element
}

function selectView(path: string, query: URLSearchParams) {
  return routes.reduce((result, {pattern, factory}) => {
    if (result !== null) {
      return result;
    }

    const matches = pattern.exec(path);
    if (matches === null) {
      return null;
    }

    return factory(matches, query);
  }, null);
}

function RouterFn({path, query}: RouterParams): JSX.Element {
  if (path === null) {
    return <Landing/>;
  }

  const view = selectView(
    path,
    query === null ? new URLSearchParams() : query,
  );

  if (view === null) {
    return <Landing/>;
  }

  return view;
}

export const Router = connect((state: State) => {
  return {
    path: state.router.path,
    query: state.router.query,
  };
})(RouterFn);