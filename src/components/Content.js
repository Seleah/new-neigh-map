import React from 'react';
import MapDisplay from './MapDisplay';
import List from './List';
import * as LocationsAPI from '../api/Locations';

export default class Content extends React.Component {
  state = {
    lat: 45.52345,
    lon: -122.67621,
    zoom: 13,
    locations: []
  }

  componentDidMount = () => {
    LocationsAPI.getLocations()
    .then(resp => this.setState({ locations: resp }));
  }

  render = () => {
    return (
      <div id="content">
        <List locations={this.state.locations} />
        <MapDisplay
          lat={this.state.lat}
          lon={this.state.lon}
          zoom={this.state.zoom}
          locations={this.state.locations} />
      </div>
    );
  }
};