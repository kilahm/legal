import * as React from 'react';
import {ReactElement} from 'react';
import {State} from '../reducer';
import {NavigationMenuItem} from './MainNavigation';
import {Dispatch} from '../store/Dispatch';
import {connect, MapDispatchToProps, MapStateToProps} from '../store/connect';
import {MainNavItem} from './MainNavItem';
import {Jwt} from '../auth/Jwt';
import createFragment = require('react-addons-create-fragment');

interface StateProps {
  items: Array<NavigationMenuItem>;
  jwt: Jwt;
  getState: () => State;
}

interface DispatchProps {
  dispatch: Dispatch;
}

type Props = StateProps & DispatchProps;

const MenuComponent: React.StatelessComponent<Props> = ({items, dispatch, getState}) => {
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
    <div className="section" id="main-menu">
      <nav className="tabs is-toggle is-fullwidth">
        <ul>{createFragment(navItems)}</ul>
      </nav>
    </div>
  );
};

const stateMap: MapStateToProps<StateProps, {}> = (state: State) => {
  return {
    items: state.menu.mainNavigation,
    jwt: state.auth.jwt,
    getState: () => state,
  };
};

const dispatchMap: MapDispatchToProps<DispatchProps, {}> = dispatch => {
  return {dispatch};
};
export const Menu = connect<StateProps, DispatchProps, {}>(stateMap, dispatchMap)(MenuComponent);
Menu.displayName = 'Menu';
