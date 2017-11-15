import * as React from 'react';
import {connect, MapDispatchToProps, MapStateToProps} from 'react-redux';
import {Meeting} from '../api/Meeting';
import {State} from '../store/reducer';
import {MeetingDetail} from './MeetingDetail';
import {Title} from '../components/Title';
import * as classNames from 'classnames';
import * as styles from './MeetingPage.css';
import {MeetingList} from './MeetingList';

interface OwnProps {
  selectedMeetingId: string | null;
}

type Props = DispatchProps & StateProps & OwnProps;

const component: React.StatelessComponent<Props> = ({selectedMeetingId, allMeetings}) => {
  const selectedMeeting = selectedMeetingId ? allMeetings[selectedMeetingId] : null;

  const view = selectedMeeting
    ? renderSplitView(selectedMeeting)
    : renderListOnly();
  return (
    <div className="container-fluid">
      <div className="row">
        <Title>Meetings</Title>
      </div>
      <div className="row">
        {view}
      </div>
    </div>
  );

};

function renderSplitView(selectedMeeting: Meeting): JSX.Element[] {
  return [
    (
      <div key="1" className="col-md-8 col-xs-12">
        <MeetingDetail meeting={selectedMeeting}/>
      </div>
    ),
    (
      <div key="2" className="col-md-4 col-xs-12">
        <MeetingList selectedMeetingId={selectedMeeting.id}/>
      </div>
    ),
  ];
}

function renderListOnly(): JSX.Element {
  return (
    <div className={classNames('col-xs-12', styles.meetingList)}>
      <MeetingList/>
    </div>
  );
}

interface DispatchProps {
}
const dispatchMap: MapDispatchToProps<DispatchProps, OwnProps> = () => (
  {}
);

interface StateProps {
  allMeetings: { [id: string]: Meeting };
}
const stateMap: MapStateToProps<StateProps, OwnProps> = (state: State) => (
  {
    allMeetings: state.meetings.all,
  }
);
export const MeetingPage = connect<StateProps, DispatchProps, OwnProps>(stateMap, dispatchMap)(component);
MeetingPage.displayName = 'MeetingPage';
