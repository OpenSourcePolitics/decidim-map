import * as React from "react";
import * as ReactDOM from "react-dom";

import Editor, { EditorProps } from "./code/editor.component";

window.DecidimCode = window.DecidimCode || {};

window.DecidimCode.renderEditors = (selector: string) => {
  window.$(selector).each((index: number, node: HTMLElement) => {
    let id = window.$(node).data('for')
    window.DecidimCode.locale = window.$(node).data('locale')
    const props: EditorProps = {
      for: id,
      value: window.$(node).prev('#' + id).val(),
      ...window.$(node).data("editor")
    };

    ReactDOM.render(
      React.createElement(Editor, props),
      node
    );
  });

};
