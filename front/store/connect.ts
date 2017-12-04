import {State} from '../reducer';
import {container} from '../container';
import {Store} from './Store';
import {ComponentClass, createElement, PureComponent, SFC} from 'react';
import {ISubscription} from '@reactivex/rxjs/dist/package/Subscription';
import {Dispatch} from './Dispatch';

const store = container.get<Store>(Store);

export interface MapStateToProps<StateProps, OwnProps = {}> {
  (state: Readonly<State>, props: OwnProps): StateProps;
}

export interface MapDispatchToProps<DispatchProps, OwnProps = {}> {
  (dispatch: Dispatch, props: OwnProps): DispatchProps;
}

type ReactNodeGenerator<P> = (SFC<P>) | (ComponentClass<P>);
type ComponentWrapper<A, B, C> = (c: ReactNodeGenerator<A & B & C>) => ComponentClass<C>;

export function connect<StateProps, DispatchProps, OwnProps = {}>(
  stateMap: MapStateToProps<StateProps, OwnProps>,
  dispatchMap: MapDispatchToProps<DispatchProps, OwnProps>,
): ComponentWrapper<StateProps, DispatchProps, OwnProps> {

  return ComponentToWrap => {
    class ConnectedComponent extends PureComponent<OwnProps, StateProps> {
      private stateListener: ISubscription;
      private dispatchProps: DispatchProps;

      constructor(props: Readonly<OwnProps>) {
        super(props);
        this.setDispatchProps(props);
        this.state = stateMap(store.getState(), props);
        this.stateListener = store.state.subscribe(state => this.setState(stateMap(state, this.props)));
      }

      componentWillUnmount() {
        this.stateListener.unsubscribe();
      }

      componentWillReceiveProps(nextProps: Readonly<OwnProps>) {
        const nextKeys = Object.keys(nextProps);
        const thisKeys = Object.keys(this.props);
        if (nextKeys.length !== thisKeys.length) {
          return this.setDispatchProps(nextProps);
        }

      }

      private setDispatchProps(props: Readonly<OwnProps>) {
        this.dispatchProps = dispatchMap(store.dispatch.bind(store), props);
      }

      render() {
        const props: any = this.props;
        const {children, ...ownProps} = props;
        const stateProps: any = this.state;
        const dispatchProps: any = this.dispatchProps;
        return createElement<StateProps & DispatchProps & OwnProps>(
          ComponentToWrap,
          {...ownProps, ...stateProps, ...dispatchProps},
          children,
        );
      }
    }

    return ConnectedComponent;
  };

}
