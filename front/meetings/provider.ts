import {ContainerModule} from 'inversify';
import {CreateNewMeeting} from './effects/CreateNewMeeting';

export default new ContainerModule(bind => {
  bind<CreateNewMeeting>(CreateNewMeeting).toSelf().inSingletonScope();
});
