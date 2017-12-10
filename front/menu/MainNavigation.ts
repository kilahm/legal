import {State} from '../reducer';
import {Dispatch} from '../store/Dispatch';
import {ChangeRoute} from '../router/actions/ChangeRoute';

export interface NavigationMenuItem {
  text: string;
  condition?: (getState: () => State) => boolean;
  active: (getState: () => State) => boolean;
  effect: (dispatch: Dispatch, getState: () => State) => any;
}

export const defaultMainNavigation: NavigationMenuItem[] = [
  buildSimpleRoute('Home', '/'),
  buildSimpleRoute('Projects', '/projects'),
  buildSimpleRoute('Documents', '/documents'),
  buildSimpleRoute('Meetings', '/meetings'),
];

function buildSimpleRoute(text: string, path: string): NavigationMenuItem {
  return {
    text,
    effect: dispatch => dispatch(new ChangeRoute({path})),
    active: getState => getState().router.path === path,
  };
}
