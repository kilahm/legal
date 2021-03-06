import * as React from 'react';
import {SFC} from 'react';
import {connect, MapDispatchToProps, MapStateToProps} from '../store/connect';
import {TogglePreviewMode} from './actions/TogglePreviewMode';
import {SetDocument} from './actions/SetDocument';
import {TextEditor} from '../form/TextEditor';
import createFragment = require('react-addons-create-fragment');
import ReactMarkdown = require('react-markdown');

interface OwnProps {

}

type Props = DispatchProps & StateProps & OwnProps;
const Component: SFC<Props> = ({document, updateDocument}) => {
  const children: any = {};
  if (document) {
    children.editor = <TextEditor
      className="column"
      style={{
        resize: 'none',
      }}
      onChange={(event) => updateDocument(document.id, event.target.value)}
      value={document.body}
    />;
    children.renderedContent = <ReactMarkdown
      className="column"
      source={document.body} escapeHtml
    />;
  }
  return (
    <div className="section">
      <div className="content">
        <div
          className="columns"
        >
          {createFragment(children)}
        </div>
      </div>
    </div>
  );
};

interface StateProps {
  preview: boolean;
  document?: {
    id: string,
    body: string,
  };
}

const stateMap: MapStateToProps<StateProps, OwnProps> = state => {
  const componentState: StateProps = {
    preview: state.documents.previewMode,
  };

  if (state.documents.activeDocument !== null) {
    componentState.document = {
      id: state.documents.activeDocument,
      body: state.documents.documents[state.documents.activeDocument],
    };
  }

  return componentState;
};

interface DispatchProps {
  updateDocument: (id: string, body: string) => void;
  togglePreviewMode: () => void;
}

const dispatchMap: MapDispatchToProps<DispatchProps, OwnProps> = dispatch => {
  return {
    togglePreviewMode: () => dispatch(new TogglePreviewMode()),
    updateDocument: (id: string, body: string) => dispatch(new SetDocument({id, body})),
  };
};
export const DocumentsPage = connect<StateProps, DispatchProps, OwnProps>(stateMap, dispatchMap)(Component);

DocumentsPage.displayName = 'DocumentsPage';