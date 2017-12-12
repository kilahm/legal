import * as React from 'react';
import {DetailedHTMLProps, SFC, TextareaHTMLAttributes} from 'react';

type Props = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;
export const TextEditor: SFC<Props> = (props) => {
  let ref: HTMLTextAreaElement | null;
  return <textarea
    {...props}
    style={{
      ...props.style,
      overflow: 'hidden',
    }}
    ref={e => ref = e}
    onChange={event => {
      if (props.onChange) {
        props.onChange(event);
      }
      if (ref) {
        ref.style.height = ref.scrollHeight + 'px';
      }
    }}
  />;
};

TextEditor.displayName = 'TextEditor';