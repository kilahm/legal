import * as React from 'react';
import {connect, MapDispatchToProps, MapStateToProps} from 'react-redux';
import {Meeting} from '../api/Meeting';
import {Actions as RouterActions} from '../router/Actions';
import {State} from '../store/reducer';
import {MeetingListEntry} from './MeetingListEntry';
import {MeetingDetail} from './MeetingDetail';
import {Title} from '../components/Title';
import * as classNames from 'classnames';
import * as styles from './MeetingPage.css';
console.log(styles);

interface DispatchProps {
  selectMeeting: (id: string) => any;
}

interface StateProps {
  allMeetings: { [id: string]: Meeting };
}

interface OwnProps {
  selectedMeetingId: string | null;
}

type Props = DispatchProps & StateProps & OwnProps;

const Component: React.StatelessComponent<Props> = ({selectedMeetingId, allMeetings, selectMeeting}) => {
  console.log('Rendering meeting page');
  const selectedMeeting = selectedMeetingId ? allMeetings[selectedMeetingId] : null;

  const renderedMeetings = Object.keys(allMeetings)
    .map(meetingId => (
        <MeetingListEntry
          data={allMeetings[meetingId]}
          onSelect={() => selectMeeting(meetingId)}
          active={meetingId === allMeetings[meetingId].id}
        />
      ),
    );

  const view = selectedMeeting
    ? renderSplitView(selectedMeeting, renderedMeetings)
    : renderListOnly(renderedMeetings);
  return (
    <div className="row">
      <div className="row"><Title>Meetings</Title></div>
      {view}
    </div>
  );

};

function renderSplitView(selectedMeeting: Meeting, listEntries: JSX.Element[]): JSX.Element[] {
  return [
    (
      <div className="col-md-8 col-xs-12">
        <MeetingDetail meeting={selectedMeeting}/>
      </div>
    ),
    (
      <div className="col-md-4 col-xs-12">
        {listEntries}
      </div>
    ),
  ];
}

function renderListOnly(listEntries: JSX.Element[]): JSX.Element {
  return (
    <div className={classNames('col-xs-12', styles.meetingList)}>
      {listEntries}
    </div>
  );
}

const dispatchMap: MapDispatchToProps<DispatchProps, OwnProps> = dispatch => {
  return {
    selectMeeting: (id: string) => dispatch(RouterActions.changeRoute({path: '/meetings/' + id})),
  };
};
const stateMap: MapStateToProps<StateProps, OwnProps> = (state: State) => (
  {
    allMeetings: state.meetings.all,
  }
);
export const MeetingPage = connect<StateProps, DispatchProps, OwnProps>(stateMap, dispatchMap)(Component);
MeetingPage.displayName = 'MeetingPage';
