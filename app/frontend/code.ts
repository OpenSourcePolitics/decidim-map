import * as React from "react";
import * as ReactDOM from "react-dom";

import Editor, { EditorProps } from "./code/editor.component";

window.DecidimCode = window.DecidimCode || {};

window.DecidimCode.renderEditors = (selector: string) => {
  console.log('window.Decidim.Code.renderEditors')

  window.$(selector).each((index: number, node: HTMLElement) => {
    console.log(node)
    let id = window.$(node).data('for')
    const props: EditorProps = {
      for: id,
      value: window.$(node).prev('#' + id).val()
    };

    ReactDOM.render(
      React.createElement(Editor, props),
      node
    );
  });

};
