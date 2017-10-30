import * as React from 'react';
import {Meeting} from '../api/Meeting';
import classNames = require('classnames');

interface Props {
  data: Meeting;
  onSelect: () => any;
  active: boolean;
}

export const MeetingListEntry: React.StatelessComponent<Props> = ({data, onSelect, active}) => {
  const classes = {
    active,
  };
  return (
    <div className={classNames('row', classes)} onClick={onSelect}>
      <span>{data.date.toLocaleDateString()}</span>
    </div>
  );
};