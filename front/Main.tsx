import * as React from 'react';
import {Menu} from './menu/Menu';

export const Main: React.StatelessComponent = ({children}): JSX.Element => {
  return (
    <div className="container">
      <div className="row">
        <Menu/>
      </div>
      <div className="row">{children}</div>
    </div>
  );
};

Main.displayName = 'Main';
