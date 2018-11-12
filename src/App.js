import React, { Component } from 'react';
import locations from './data/locations.json';
import MapDisplay from './components/MapDisplay';
import './App.css';

class NeighApp extends Component {
  state = {
    lat: 45.52345,
    lon: -122.67621,
    zoom: 13,
    all: locations
  }

  render() {
    return (
      <div className="App">
        <header>Neighborhood Map</header>
        <MapDisplay
        lat={this.state.lat}
          lon={this.state.lon}
          zoom={this.state.zoom}
          locations={this.state.all}/>
      </div>
    );
  }
}

export default NeighApp;
