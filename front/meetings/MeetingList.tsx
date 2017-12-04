import * as React from 'react';
import {Meeting} from '../api/Meeting';
import {MeetingListEntry} from './MeetingListEntry';
import {NewMeeting} from './NewMeeting';
import {IconButton} from '../components/IconButton';
import {connect, MapDispatchToProps, MapStateToProps} from '../store/connect';
import {ChangeRoute} from '../router/ChangeRoute';
import {FetchMeetings} from './Actions';

interface OwnProps {
  selectedMeetingId?: string;
}

type Props = OwnProps & DispatchProps & StateProps

const component: React.StatelessComponent<Props> = ({selectedMeetingId, meetings, selectMeeting, triggerRefresh}) => {

  const renderedMeetings = Object.keys(meetings)
    .map(meetingId => (
        <MeetingListEntry
          key={meetingId}
          data={meetings[meetingId]}
          onSelect={() => selectMeeting(meetingId)}
          active={meetingId === selectedMeetingId}
        />
      ),
    );
  return (
    <div>
      <div className="row">
        <NewMeeting/>
        <IconButton
          id="refresh-meetings"
          label="Refresh Meetings"
          iconName="refresh"
          onClick={triggerRefresh}
        />
      </div>
      {renderedMeetings}
    </div>
  );
};

interface StateProps {
  meetings: { [id: string]: Meeting };
}

const stateMap: MapStateToProps<StateProps, OwnProps> = state => (
  {
    meetings: state.meetings.all,
  }
);

interface DispatchProps {
  selectMeeting: (id: string) => any;
  triggerRefresh: () => void;
}

const dispatchMap: MapDispatchToProps<DispatchProps, OwnProps> = dispatch => {
  return {
    selectMeeting: (id: string) => dispatch(new ChangeRoute({path: '/meetings/' + id})),
    triggerRefresh: () => dispatch(new FetchMeetings()),
  };
};

export const MeetingList = connect<StateProps, DispatchProps, OwnProps>(stateMap, dispatchMap)(component);
MeetingList.displayName = 'MeetingList';

