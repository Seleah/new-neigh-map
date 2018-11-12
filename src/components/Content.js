import React from 'react';
import locations from '../data/locations.json';
import MapDisplay from './MapDisplay';

export default class Content extends React.Component {
  state = {
    lat: 45.52345,
    lon: -122.67621,
    zoom: 13,
    all: locations
  }

  render = () => {
    return (
      <MapDisplay
        lat={this.state.lat}
        lon={this.state.lon}
        zoom={this.state.zoom}
        locations={this.state.all}/>
    );
  }
}