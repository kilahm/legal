import {FieldState, FormState as ReduxFormState} from 'react-redux-form';

export function sleepAsync(time: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

export interface FormState<Tmodel extends Object> {
  model: Tmodel;
  form: {
    $form: ReduxFormState,
  } & {
    [K in keyof Tmodel]: FieldState
    };
}
