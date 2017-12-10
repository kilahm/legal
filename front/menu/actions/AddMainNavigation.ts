import {NavigationMenuItem} from '../MainNavigation';
import {Action} from '../../store/Action';

type Payload = {
  menuItem: NavigationMenuItem,
};

export class AddMainNavigation extends Action<Payload> {

}