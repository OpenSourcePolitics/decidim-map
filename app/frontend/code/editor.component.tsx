import * as React from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2'
require('codemirror/mode/javascript/javascript')
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'

const prettier = require("prettier/standalone");
const prettierBabylon = require("prettier/parser-babylon");
const prettierTS = require("prettier/parser-typescript");

export interface EditorProps {
  for: string;
  value?: string;
}

interface EditorState {
  value: string;
  options: object;
}

export class Editor extends React.Component<EditorProps, EditorState> {

  constructor(props: EditorProps) {
    super(props);
    this.state = {
      value: prettier.format((props.value || ''),{
        parser: 'json',
        plugins: [prettierBabylon]
      }),
      options : {
        mode: 'javascript',
        theme: 'monokai'
      }
    };
  }

  public render(): JSX.Element {
    return (
      <CodeMirror
        value={this.state.value}
        options={this.state.options}
        onBeforeChange={(editor, data, value) => {
          this.setState({value});
        }}
        onChange={(editor, data, value) => {
          window.$('#' + this.props.for).val(value.replace(/\s/g, ''))
        }}
      />
    )
  }
}

export default Editor;
