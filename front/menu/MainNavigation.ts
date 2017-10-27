import {Dispatch} from 'redux';
import {State} from '../store/reducer';
import {Actions as RouterActions} from '../router/Actions';
import {Actions as AuthActions} from '../auth/Actions';

export interface NavigationMenuItem {
  text: string;
  effect: (dispatch: Dispatch<State>, getState: () => State) => any
}

export const defaultMainNavigation: NavigationMenuItem[] = [
  {
    text: 'Home',
    effect: dispatch => dispatch(RouterActions.changeRoute({path: '/'})),
  },
  {
    text: 'Projects',
    effect: dispatch => dispatch(RouterActions.changeRoute({path: '/projects'})),
  },
  {
    text: 'Documents',
    effect: dispatch => dispatch(RouterActions.changeRoute({path: '/documents'})),
  },
  {
    text: 'Meetings',
    effect: dispatch => dispatch(RouterActions.changeRoute({path: '/meetings'})),
  },
  {
    text: 'Log out',
    effect: dispatch => dispatch(AuthActions.logout()),
  },
];
