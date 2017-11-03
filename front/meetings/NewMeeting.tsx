import * as React from 'react';
import {Control, Form} from 'react-redux-form';
import {Meeting} from '../api/Meeting';
import {connect, MapDispatchToProps} from 'react-redux';
import {Actions} from './Actions';
import {NewMeetingModel} from './reducer';
import {PendingEntityManager} from '../core/PendingEntityManager';

type Props = DispatchProps;
const component: React.StatelessComponent<Props> = ({createMeeting}) => (
  <Form
    model="meetings.newMeeting.model"
    onSubmit={(model: NewMeetingModel) => createMeeting(mapModelToMeeting(model))}
  >
    <Control.text model=".date"/>
    <button className="btn btn-primary" type="submit">Submit</button>
  </Form>
);

function mapModelToMeeting(model: NewMeetingModel): Meeting {
  return {
    id: PendingEntityManager.getTempId(),
    date: new Date(model.date),
  };
}

interface DispatchProps {
  createMeeting: (meeting: Meeting) => void;
}

const dispatchMap: MapDispatchToProps<DispatchProps, {}> = dispatch => (
  {
    createMeeting: (meeting: Meeting) => dispatch(Actions.createMeeting(meeting)),
  }
);


export const NewMeeting = connect<{}, DispatchProps, {}>(null, dispatchMap)(component);
NewMeeting.displayName = 'NewMeeting';
