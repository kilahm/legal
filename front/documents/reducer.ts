import {Action} from '../store/Action';
import {TogglePreviewMode} from './actions/TogglePreviewMode';
import {SetDocument} from './actions/SetDocument';

export interface State {
  previewMode: boolean;
  activeDocument: string | null;
  documents: { [id: string]: string };
}

const defaultState = {
  previewMode: false,
  activeDocument: '1',
  documents: {['1']: 'initial document'},
};

export function reducer(action: Action<any>, state: State = defaultState): State {
  if (action instanceof TogglePreviewMode) {
    return {
      ...state,
      previewMode: !state.previewMode,
    };
  }

  if (action instanceof SetDocument) {
    return {
      ...state,
      documents: {
        ...state.documents,
        [action.payload.id]: action.payload.body,
      },
    };
  }

  return state;
}