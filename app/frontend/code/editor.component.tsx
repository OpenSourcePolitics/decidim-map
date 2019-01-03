import * as React from 'react';

import { TopBar } from 'react-foundation';
import * as utils from './utils';
import ResizableWrapper from '../application/resizable.component';

// CodeMirror (code display)
import {
  Controlled as CodeMirror,
  IInstance as CodeMirrorIInstance
} from 'react-codemirror2';
import { EditorChange as CodeMirrorChange } from 'codemirror';
require('codemirror/mode/javascript/javascript');
import 'codemirror/lib/codemirror.css';

// Prettier (code formatter)
const prettier = require("prettier/standalone");
const prettierBabylon = require("prettier/parser-babylon");
const prettierTS = require("prettier/parser-typescript");

export interface EditorProps {
  for: string;
  value?: string;
  mode?: string;
}

interface EditorState {
  value: string;
  options: object;
}

export class Editor extends React.Component<EditorProps, EditorState> {
  public editor: CodeMirrorIInstance;

  constructor(props: EditorProps) {
    super(props);
    this.state = {
      value: prettier.format((props.value || ''),{
        parser: 'json',
        plugins: [prettierBabylon]
      }),
      options : {
        mode: props.mode || 'javascript'
      }
    };
  }

  public handleChange = (editor: CodeMirrorIInstance, data: CodeMirrorChange, value: string) => {
    window.$('#' + this.props.for).val(utils.compressJSON(value));
  }

  public textData = () => {
    utils.textData(this.state.value)
  }

  public render(): JSX.Element {
    let { options, value } = this.state;
    let data = utils.textData(value);
    return (
      <div>
        <ResizableWrapper
          onResize={(height) => {
            this.editor.setSize(null,height);
          }}>
          <CodeMirror
            value={value}
            options={options}
            onBeforeChange={(editor, data, value) => {
              this.setState({value});
            }}
            onChange={this.handleChange}
            editorDidMount={(editor: CodeMirrorIInstance) => {
              this.editor = editor
            }}
          />
        </ResizableWrapper>
        <div className='ce-footer clearfix'>
          <span className='float-right'>{data.size}</span>
        </div>
      </div>
    )
  }
}

export default Editor;
