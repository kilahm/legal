import * as React from 'react';
import {StatelessComponent} from 'react';
import {State} from '../reducer';
import {Landing} from '../landing/Landing';
import {routes} from '../routes';
import {NotFound} from './NotFound';
import {connect, MapDispatchToProps, MapStateToProps} from '../store/connect';

interface StateProps {
  path: string | null;
  query: string | null,
}

interface DispatchProps {
}

export interface Route {
  pattern: RegExp;
  factory: (matches: RegExpExecArray, query: string) => JSX.Element
}

function selectView(path: string, query: string): JSX.Element {
  for (let {pattern, factory} of routes) {
    const matches = pattern.exec(path);
    if (matches !== null) {
      return factory(matches, query);
    }
  }
  return <NotFound/>;
}

type Props = StateProps & DispatchProps
const RouterComponent: StatelessComponent<Props> = ({path, query}) => {

  if (path === null) {
    return <Landing/>;
  }

  return selectView(
    path,
    query === null ? '' : query,
  );
};

const stateMap: MapStateToProps<StateProps, {}> = (state: State) => {
  return {
    path: state.router.path,
    query: state.router.query,
  };
};
const dispatchMap: MapDispatchToProps<{}, {}> = () => (
  {}
);
export const Router = connect<StateProps, DispatchProps, {}>(stateMap, dispatchMap)(RouterComponent);