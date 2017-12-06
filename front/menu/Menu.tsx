import * as React from 'react';
import {ReactElement} from 'react';
import {State} from '../reducer';
import {NavigationMenuItem} from './MainNavigation';
import {Dispatch} from '../store/Dispatch';
import {connect, MapDispatchToProps, MapStateToProps} from '../store/connect';
import {MainNavItem} from './MainNavItem';
import createFragment = require('react-addons-create-fragment');

interface StateProps {
  items: Array<NavigationMenuItem>;
  loggedIn: boolean;
  getState: () => State;
}

interface DispatchProps {
  dispatch: Dispatch;
}

type Props = StateProps & DispatchProps;

const MenuComponent: React.StatelessComponent<Props> = ({items, loggedIn, dispatch, getState}) => {
  if (!loggedIn) {
    return null;
  }
  const navItems: { [key: string]: ReactElement<any> } = {};
  for (let nav of items) {
    if (nav.condition && !nav.condition(getState)) {
      continue;
    }
    navItems[nav.text] = <MainNavItem
      active={nav.active(getState)}
      text={nav.text}
      onClick={() => nav.effect(dispatch, getState)}
    />;
  }
  return (
    <nav className="tabs is-toggle is-fullwidth">
      <ul>{createFragment(navItems)}</ul>
    </nav>
  );
};

const stateMap: MapStateToProps<StateProps, {}> = (state: State) => {
  return {
    items: state.menu.mainNavigation,
    loggedIn: state.auth.jwt && state.auth.jwt.isValid(),
    getState: () => state,
  };
};

const dispatchMap: MapDispatchToProps<DispatchProps, {}> = dispatch => {
  return {dispatch};
};
export const Menu = connect<StateProps, DispatchProps, {}>(stateMap, dispatchMap)(MenuComponent);
Menu.displayName = 'Menu';
