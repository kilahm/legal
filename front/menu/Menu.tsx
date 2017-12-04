import * as React from 'react';
import {State} from '../reducer';
import {NavigationMenuItem} from './MainNavigation';
import {Dispatch} from '../store/Dispatch';
import {connect, MapDispatchToProps, MapStateToProps} from '../store/connect';

interface StateProps {
  navigation: Array<NavigationMenuItem>
  getState: () => State;
}

interface DispatchProps {
  dispatch: Dispatch;
}

type Props = StateProps & DispatchProps;

const MenuComponent: React.StatelessComponent<Props> = ({navigation, dispatch, getState}) => {
  return (
    <div className="btn-group">
      {navigation.map((nav, index) => (
        <button
          key={'nav-menu-' + index}
          className="btn btn-default"
          onClick={() => nav.effect(dispatch, getState)}
        >
          {nav.text}
        </button>
      ))}
    </div>
  );
};

const stateMap: MapStateToProps<StateProps, {}> = (state: State) => {
  return {
    navigation: state.menu.mainNavigation,
    getState: () => state,
  };
};

const dispatchMap: MapDispatchToProps<DispatchProps, {}> = dispatch => {
  return {dispatch};
};
export const Menu = connect<StateProps, DispatchProps, {}>(stateMap, dispatchMap)(MenuComponent);
