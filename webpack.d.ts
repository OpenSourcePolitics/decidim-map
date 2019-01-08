declare interface Window {
  DecidimCode: any;
  DecidimMap: any;
  EditorComponent: any;
  MapComponent: any;
  MapApplication: any;
  MapWithData: any;
  $: any;
}

declare module '@mapbox/geojsonhint';
declare module 'react-leaflet-sidetabs';
declare module 'react-leaflet-markercluster' {
  import {MapLayer} from 'react-leaflet'
  export default class MarkerClusterGroup extends MapLayer {}
}
