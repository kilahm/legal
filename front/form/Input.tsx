import * as React from 'react';
import {ChangeEventHandler, InputHTMLAttributes, ReactElement, StatelessComponent} from 'react';
import {connect, MapDispatchToProps} from '../store/connect';
import {UpdateField} from './actions/UpdateField';

interface OwnProps extends InputHTMLAttributes<HTMLInputElement> {
  model: string;
  formId: symbol;
}

interface DispatchProps {
  updateField: (form: symbol, model: string, value: string) => void;
}

type Props = OwnProps & DispatchProps;
const Component: StatelessComponent<Props> = ({model, formId, onChange, updateField, ...rest}) => {

  const connectedChange: ChangeEventHandler<HTMLInputElement> = event => {
    updateField(formId, model, event.currentTarget.value);
    if (typeof onChange === 'function') {
      onChange(event);
    }
  };

  return (
    <input {...rest} onChange={connectedChange}/>
  );
};

const stateMap = () => (
  {}
);
const dispatchMap: MapDispatchToProps<DispatchProps, OwnProps> = dispatch => {
  return {
    updateField: (form: symbol, model: string, value: string) => dispatch(new UpdateField({form, model, value})),
  };
};
export type InputElement = ReactElement<OwnProps>;
export const Input = connect(stateMap, dispatchMap)(Component);
Input.displayName = 'Input';