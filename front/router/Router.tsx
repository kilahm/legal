import * as React from 'react';
import {StatelessComponent} from 'react';
import {connect, MapStateToProps} from 'react-redux';
import {State} from '../store/reducer';
import {Landing} from '../landing/Landing';
import {routes} from '../routes';
import {Login} from '../login/Login';
import {CreateAdmin} from '../user/CreateAdmin';
import {NotFound} from './NotFound';

interface StateProps {
  path: string | null;
  query: string | null,
  loggedIn: boolean;
  adminExists: boolean;
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
const RouterComponent: StatelessComponent<Props> = ({path, query, loggedIn, adminExists}) => {
  if (!adminExists) {
    return <CreateAdmin/>;
  }
  if (!loggedIn) {
    return <Login/>;
  }

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
    loggedIn: state.login.jwt !== '',
    adminExists: state.api.state.hasAdmin,
  };
};
export const Router = connect<StateProps, DispatchProps, {}>(stateMap)(RouterComponent);