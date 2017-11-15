import * as React from 'react';
import {CSSProperties} from 'react';
import * as classNames from 'classnames';
import {BootstrapType} from '../util';

interface Props {
  iconName: string,
  style?: CSSProperties
  id: string,
  label: string,
  onClick: () => void,
  type?: BootstrapType
}

export const IconButton: React.StatelessComponent<Props> = ({
  iconName,
  style,
  id,
  label,
  children,
  onClick,
  type,
}) => {
  const btnType = type ? type.toString() : 'default';
  return (
    <span style={style}>
      <label htmlFor={id} className="sr-only">{label}</label>
      <button
        id={id}
        onClick={onClick}
        className={classNames('btn', 'btn-sm', `btn-${btnType}`)}
      >
        <span className={classNames('glyphicon', `glyphicon-${iconName}`)}/>
        {children}
      </button>
    </span>
  );
};

IconButton.displayName = 'IconButton';
