import * as React from 'react';
import {SFC} from 'react';
import {Moment} from 'moment';
import * as Datetime from 'react-datetime';
import {State} from '../reducer';
import {IconButton} from '../components/IconButton';
import {connect, MapDispatchToProps, MapStateToProps} from '../store/connect';
import moment = require('moment');
import classNames = require('classnames');
import {CreateMeeting} from './actions/CreateMeeting';
import {SetNewMeetingCalendarOpenState} from './actions/SetNewMeetingCalendarOpenState';
import {UpdateDateForNewMeeting} from './actions/UpdateDateForNewMeeting';
import {ResetSelectedDateForNewMeeting} from './actions/ResetSelectedDateForNewMeeting';

type Props = DispatchProps & StateProps;

const component: SFC<Props> = ({
  selectedDate,
  createMeeting,
  openCalendar,
  closeCalendar,
  calendarIsOpen,
  updateSelectedDate,
  clearCalendar,
}) => {
  const calendar = calendarIsOpen ? renderCalendar() : null;
  return (
    <div>
      <IconButton
        key={'button'}
        id="new-meeting"
        onClick={openCalendar}
        iconName={'plus'}
        label={'New Meeting'}
      />
      {calendar}
    </div>
  );

  function renderCalendar() {
    return (
      <div
        key={'calendar'}
        className={classNames('popover', 'right')}
        style={{display: 'block', top: -10, left: 276}}
      >
        <div className={'arrow'} style={{top: 25}}/>
        <div className={'popover-content'}>
          <button
            className="btn btn-primary"
            style={{marginRight: '10px'}}
            disabled={selectedDate === undefined}
            onClick={() => {
              if (selectedDate !== undefined) {
                createMeeting(selectedDate);
                clearCalendar();
                closeCalendar();
              }
            }}
          >
            OK
          </button>
          <button
            className="btn btn-default"
            onClick={() => {
              closeCalendar();
              clearCalendar();
            }}
          >
            Cancel
          </button>
          <Datetime
            value={selectedDate}
            onChange={(date) => {
              if (moment.isMoment(date)) {
                updateSelectedDate(date);
              }
            }}
            onBlur={clearCalendar}
            input={false}
          />
        </div>
      </div>
    );
  }
};

interface DispatchProps {
  createMeeting: (start: Date) => void;
  openCalendar: () => void;
  closeCalendar: () => void;
  updateSelectedDate: (date: Moment) => void;
  clearCalendar: () => void;
}

const dispatchMap: MapDispatchToProps<DispatchProps, {}> = dispatch => (
  {
    createMeeting: (start: Date) => dispatch(new CreateMeeting({start})),
    openCalendar: () => dispatch(new SetNewMeetingCalendarOpenState({openState: true})),
    closeCalendar: () => dispatch(new SetNewMeetingCalendarOpenState({openState: false})),
    updateSelectedDate: (date: Moment) => dispatch(new UpdateDateForNewMeeting({date: date.toDate()})),
    clearCalendar: () => dispatch(new ResetSelectedDateForNewMeeting()),
  }
);

interface StateProps {
  calendarIsOpen: boolean;
  selectedDate: undefined | Date;
}

const stateMap: MapStateToProps<StateProps, {}> = (state: State) => (
  {
    calendarIsOpen: state.meetings.newMeeting.isOpen,
    selectedDate: state.meetings.newMeeting.selectedDate,
  }
);


export const NewMeeting = connect<StateProps, DispatchProps, {}>(stateMap, dispatchMap)(component);
NewMeeting.displayName = 'NewMeeting';
