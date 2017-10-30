import * as React from 'react';
import {Meeting} from '../api/Meeting';

interface Props {
  meeting: Meeting
}

export const MeetingDetail: React.StatelessComponent<Props> = ({meeting}) => {
  return (
    <div>This is the meeting details {JSON.stringify(meeting)}</div>
  );
};