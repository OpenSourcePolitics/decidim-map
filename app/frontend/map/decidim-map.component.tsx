import * as React from "react";
import { graphql } from "react-apollo";

import { Map, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet';
import { Sidebar, Tab } from 'react-leaflet-sidetabs'
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { FiHome, FiChevronRight, FiSearch, FiSettings } from "react-icons/fi";
import { FaCog } from "react-icons/fa";

import Application from "../application/application.component";
import { Icon, FaIcon, ComponentIcon, ButtonIcon } from "../application/icon.component";

import { GetMapQuery } from "../support/schema";

const { I18n } = require("react-i18nify");

interface DecidimMapProps extends GetMapQuery {
  loading?: boolean;
}

interface DecidimMapState {
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
export class DecidimMapComponent extends React.Component<DecidimMapProps, DecidimMapState> {

  constructor(props: DecidimMapProps) {
    console.log("DecidimMapComponent -- constructor");
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
    console.log("DecidimMapComponent -- render");
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
                  position={[proposal.coordinates!.latitude, proposal.coordinates!.longitude]}>
                  <Popup>{proposal.title}</Popup>
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
 * Wrap the DecidimMap component with a GraphQL query and children
 * fragments.
 */

window.DecidimMapComponent = DecidimMapComponent;

export const mapQuery = require("../queries/map.query.graphql");

const DecidimMapComponentWithData: any = graphql<GetMapQuery, DecidimMapProps>(mapQuery, {
  options: {
    pollInterval: 15000
  },
  props: ({ ownProps, data }) => {
    console.log("DecidimMapComponentWithData -- props");
    console.dir(ownProps);
    console.dir(data);
    return {...data};
  }
})(DecidimMapComponent);

export interface DecidimMapApplicationProps {
  locale: string;
}

/**
 * Wrap the DecidimMapWithData component within an Application component to
 * connect it with Apollo client and store.
 * @returns {ReactComponent} - A component wrapped within an Application component
 */
const DecidimMapApplication: React.SFC<DecidimMapApplicationProps> = ({ locale }) => (
  <Application locale={locale}>
    <DecidimMapComponentWithData />
  </Application>
);

export default DecidimMapApplication;
