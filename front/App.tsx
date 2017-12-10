import * as React from 'react';
import {ReactChild} from 'react';
import {Login} from './auth/Login';
import {connect, MapDispatchToProps, MapStateToProps} from './store/connect';
import {Jwt} from './auth/Jwt';
import {Router} from './router/Router';
import {CreateAdmin} from './user/CreateAdmin';
import {createPortal} from 'react-dom';
import {Menu} from './menu/Menu';
import createFragment = require('react-addons-create-fragment');

interface OwnProps {
}

type Props = StateProps & DispatchProps & OwnProps;

class Component extends React.Component<Props, {}> {
  render() {
    const {contentRoot} = this.props;
    if (contentRoot === null) {
      return null;
    }
    return createPortal(createFragment(this.createPage()), contentRoot);
  }

  private createPage(): { [key: string]: ReactChild } {
    const {jwt, adminExists} = this.props;

    if (!jwt || !jwt.isValid()) {
      return {login: <Login/>};
    }

    if (!adminExists) {
      return {createAdmin: <CreateAdmin/>};
    }

    return {menu: <Menu/>, router: <Router/>};
  }
}


interface StateProps {
  jwt: Jwt;
  adminExists: boolean
  contentRoot: null | Element;
}

const stateMap: MapStateToProps<StateProps, OwnProps> = state => (
  {
    jwt: state.auth.jwt,
    adminExists: state.api.state.hasAdmin,
    contentRoot: state.core.contentRoot,
  }
);

interface DispatchProps {
}

const dispatchMap: MapDispatchToProps<DispatchProps, OwnProps> = () => (
  {}
);

export const App = connect(stateMap, dispatchMap)(Component);
App.displayName = 'App';
