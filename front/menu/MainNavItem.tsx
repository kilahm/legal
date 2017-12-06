import * as React from 'react';
import {StatelessComponent} from 'react';
import classNames = require('classnames');

interface Props {
  text: string,
  active: boolean,
  onClick: () => void,
}

export const MainNavItem: StatelessComponent<Props> = ({text, active, onClick}) => {
  const classes = classNames(
    {
      ['is-active']: active,
    }
  );
  return (
    <li
      className={classes}
    >
      <a onClick={onClick}>{text}</a>
    </li>
  );
};
MainNavItem.displayName = 'MainNavItem';
