import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import { graphql } from "react-apollo";
import assetUrl from "../support/asset_url";

import { Map, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet';
import { Sidebar, Tab } from 'react-leaflet-sidetabs'
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { FiHome, FiChevronRight, FiSearch, FiSettings } from "react-icons/fi";
import { FaCog } from "react-icons/fa";

import Application from "../application/application.component";
import { Icon, FaIcon, ComponentIcon, ButtonIcon, MarkerIcon } from "../application/icon.component";
import { DivIcon as LeafletDivIcon } from 'leaflet'

import { GetMapQuery } from "../support/schema";

const { I18n } = require("react-i18nify");

interface MapProps extends GetMapQuery {
  loading?: boolean;
}

interface MapState {
  collapsed?: boolean;
  selected: string;
}

/**
 * The core class of the Decidim Map engine.
 * It renders a collection of comments given a commentable id and type.
 * @global
 * @class
 * @augments Component
 */
export class MapComponent extends React.Component<MapProps, MapState> {

  constructor(props: MapProps) {
    console.log("MapComponent -- constructor");
    console.dir(props);
    super(props);
    this.state = {
      collapsed: true,
      selected: 'settings',
    };
  }

  public onClose() {
    this.setState({ collapsed: true });
  }

  public onOpen(id: any) {
    this.setState({
      collapsed: false,
      selected: id,
    })
  }

  public componentDidCatch(error: any, info: any) {
    // You can also log the error to an error reporting service
    console.error(error);
  }

  public render() {
    console.log("MapComponent -- render");
    console.dir(this.state);
    console.dir(this.props);

    if (this.props.loading) return "Loading...";

    let mapClasses = "decidim-map";
    // if (loading) {
    //   mapClasses += " loading-map";
    // }

    const data = this.props['map'] || {
      proposals: [],
      meetings: []
    }

    return (
      <div className={mapClasses} id="decidim-map">
        <Sidebar
          id="decidim-map-sidebar"
          position="left"
          collapsed={this.state.collapsed}
          closeIcon={<FaIcon name="times" transform="shrink-4 up-2" />}
          selected={this.state.selected}
          onOpen={this.onOpen.bind(this)}
          onClose={this.onClose.bind(this)}
        >
          <Tab id="home" header="Home" icon={<Icon name="icon-target" />}>
            <p>No place like home!</p>
          </Tab>
          <Tab id="settings" header="Settings (with Context?)" anchor="bottom" icon={<ButtonIcon name="cog" />}>
            <p>
              Assertively recaptiualize integrated services for bleeding-edge imperatives.
              Dramatically deliver interoperable potentialities whereas corporate.
            </p>
          </Tab>
        </Sidebar>
        <Map className="mapStyle"
          center={[48.8598254, 2.3132487]}
          zoom={12}
          zoomControl={false}
          maxZoom={20}>
          <TileLayer
            attribution="Carto/OSM - CC BY 3.0."
            url={'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png'}
          />
          <ZoomControl position="topright" />
          {data.proposals && (
            <MarkerClusterGroup>
              { data.proposals.map((proposal) => proposal && (
                <Marker
                  key={'marker-' + proposal.id}
                  position={[proposal.coordinates!.latitude, proposal.coordinates!.longitude]}
                  icon={new LeafletDivIcon({
                    className: 'marker-icon',
                    html: ReactDOMServer.renderToString(<MarkerIcon name="align-left" />),
                    iconSize: [40, 32],
                    iconAnchor: [20, 32],
                    popupAnchor: [0, -16],
                    shadowUrl: assetUrl('marker-shadow.png'),
                    shadowRetinaUrl: assetUrl('marker-shadow.png'),
                    shadowSize:   [40, 64],
                    shadowAnchor: [20, 32],
                  })} >
                  <Popup>
                    <div className="map-info__content">
                      <h3>{proposal.title}</h3>
                      <div className="bodyContent">
                        <p>{proposal.body}</p>
                        <div className="map__date-adress">
                          <div className="address card__extra">
                            <div className="address__icon"><FaIcon name="map-marker-alt"/></div>
                            <div className="address__details">
                              <span>{proposal.address}</span><br />
                            </div>
                          </div>
                        </div>
                        <div className="map-info__button">
                          <a href="#" className="button button--sc">
                            {I18n.t("decidim.proposals.proposals.index.view_proposal")}
                          </a>
                        </div>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>
          )}
        </Map>
      </div>
    );
  }

}

/**
 * Wrap the Map component with a GraphQL query and children
 * fragments.
 */

window.MapComponent = MapComponent;

export const mapQuery = require("../queries/map.query.graphql");

const MapComponentWithData: any = graphql<GetMapQuery, MapProps>(mapQuery, {
  options: {
    pollInterval: 15000
  },
  props: ({ ownProps, data }) => {
    console.log("MapComponentWithData -- props");
    console.dir(ownProps);
    console.dir(data);
    return {...data};
  }
})(MapComponent);

export interface MapApplicationProps {
  locale: string;
}

/**
 * Wrap the MapWithData component within an Application component to
 * connect it with Apollo client and store.
 * @returns {ReactComponent} - A component wrapped within an Application component
 */
const MapApplication: React.SFC<MapApplicationProps> = ({ locale }) => (
  <Application locale={locale}>
    <MapComponentWithData />
  </Application>
);

export default MapApplication;
