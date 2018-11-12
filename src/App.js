import React, { Component } from 'react';
import locations from './data/locations.json';
import MapDisplay from './components/MapDisplay';
import Header from './components/Header';
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
        <Header/>
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
