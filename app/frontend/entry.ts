import * as React from "react";
import * as ReactDOM from "react-dom";

// console.log('app/frontend/entry.ts START');

import DecidimMapComponent, { DecidimMapApplicationProps } from "./map/decidim-map.component";
import loadTranslations from "./support/load_translations";

window.DecidimMap = window.DecidimMap || {};

window.DecidimMap.renderMapComponent = (nodeId: string, props: DecidimMapApplicationProps) => {
  const node = window.$(`#${nodeId}`)[0];

  ReactDOM.render(
    React.createElement(DecidimMapComponent, props),
    node
  );
};

// Load component locales from yaml files
loadTranslations();

// console.log('app/frontend/entry.ts END');
