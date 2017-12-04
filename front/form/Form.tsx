import * as React from 'react';
import {FormEvent, FormHTMLAttributes, ReactElement, StatelessComponent} from 'react';
import {Input, InputElement} from './Input';
import {connect, MapStateToProps} from '../store/connect';
import {State} from '../reducer';
import {getSubState} from '../util';

interface OwnProps extends FormHTMLAttributes<HTMLFormElement> {
  submit: (values: { [model: string]: string }) => void;
  modelPrefix: string;
}

function isInput(element: ReactElement<any>): element is InputElement {
  return element.type === Input;
}

function getModelFromInput(child: any): string | null {
  if (React.isValidElement(child) && isInput(child)) {
    return child.props.model;
  }
  return null;
}

function stringFilter(data: any): data is string {
  return typeof data === 'string';
}

function getModels(children: any): string[] {
  if (children instanceof Array) {
    return children.map(getModelFromInput).filter(stringFilter);
  }
  return [getModelFromInput(children)].filter(stringFilter);
}

function getValues(children: any, state: any): { [model: string]: string } {
  return getModels(children).reduce((values, model) => {
    return {
      ...values,
      [model]: state[model],
    };
  }, {});
}


type Props = OwnProps & StateProps;
const Component: StatelessComponent<Props> = ({submit, modelPrefix, children, state, ...ownProps}) => {
  const connectedSubmit = async (event: FormEvent<HTMLFormElement>) => {
    if (typeof submit !== 'function') {
      return;
    }
    event.preventDefault();
    const modelState = getSubState(modelPrefix, state);
    if (modelState === undefined) {
      throw new Error(`Unable to find form state in ${modelPrefix}`);
    }
    submit(getValues(children, modelState));
  };
  return (
    <form
      {...ownProps}
      onSubmit={connectedSubmit}
    >
      {children}
    </form>
  );
};

interface StateProps {
  state: State
}

const stateMap: MapStateToProps<StateProps, OwnProps> = state => (
  {state}
);
export const Form = connect(
  stateMap,
  () => (
    {}
  ),
)(Component);
Form.displayName = 'Form';