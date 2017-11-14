import {ContainerModule} from 'inversify';
import {CreateNewMeeting} from './effects/CreateNewMeeting';
import {FetchMeetings} from './effects/FetchMeetings';

export default new ContainerModule(bind => {
  bind<CreateNewMeeting>(CreateNewMeeting).toSelf().inSingletonScope();
  bind<FetchMeetings>(FetchMeetings).toSelf().inSingletonScope();
});
