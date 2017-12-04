import {State} from '../reducer';
import {Dispatch} from '../store/Dispatch';
import {ChangeRoute} from '../router/ChangeRoute';
import {Logout} from '../auth/Actions';

export interface NavigationMenuItem {
  text: string;
  effect: (dispatch: Dispatch, getState: () => State) => any
}

export const defaultMainNavigation: NavigationMenuItem[] = [
  {
    text: 'Home',
    effect: dispatch => dispatch(new ChangeRoute({path: '/'})),
  },
  {
    text: 'Projects',
    effect: dispatch => dispatch(new ChangeRoute({path: '/projects'})),
  },
  {
    text: 'Documents',
    effect: dispatch => dispatch(new ChangeRoute({path: '/documents'})),
  },
  {
    text: 'Meetings',
    effect: dispatch => dispatch(new ChangeRoute({path: '/meetings'})),
  },
  {
    text: 'Log out',
    effect: dispatch => dispatch(new Logout()),
  },
];
