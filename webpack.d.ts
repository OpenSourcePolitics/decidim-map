declare interface Window {
    DecidimMapComponent: any;
    DecidimMap: any;
    DecidimMapApplication: any;
    DecidimMapWithData: any;
    $: any;
}

declare module 'react-leaflet-sidetabs';
declare module 'react-leaflet-markercluster' {
    import {MapLayer} from 'react-leaflet'
    export default class MarkerClusterGroup extends MapLayer {}
}
