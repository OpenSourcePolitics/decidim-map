import * as React from "react";
import * as ReactDOM from "react-dom";

// console.log('app/frontend/entry.ts START');

import MapComponent, { MapApplicationProps } from "./map/map.component";
import loadTranslations from "./support/load_translations";

window.DecidimMap = window.DecidimMap || {};

window.DecidimMap.renderMapComponent = (nodeId: string, props: MapApplicationProps) => {
  const node = window.$(`#${nodeId}`)[0];

  ReactDOM.render(
    React.createElement(MapComponent, props),
    node
  );
};

// Load component locales from yaml files
loadTranslations();

// console.log('app/frontend/entry.ts END');
