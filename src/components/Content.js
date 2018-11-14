import React from 'react';
import MapDisplay from './MapDisplay';
import List from './List';
import * as LocationsAPI from '../api/Locations';

export default class Content extends React.Component {
  state = {
    lat: 45.52345,
    lon: -122.67621,
    zoom: 12.5,
    locations: [],
    openWindows: null,
    activeConMarker: null,
    activeConMarkerProps: null,
    showingConInfoWindow: false,
    query: ''
  }

  handleClick = (loc) => {
    // console.log(loc);
    for (let x in window.markers) {
      // console.log(window.markers[x].title, loc.venue.name);
      if (window.markers[x].title === loc.venue.name) {
        console.log('match');
        let infoWin = new window.google.maps.InfoWindow({
          content: `<div><a href="#">${loc.venue.name}</a>
                  <p>${loc.venue.location.address}</p></div>`
        });

        let toggleBounce = (marker) => {
          if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
          } else {
            marker.setAnimation(window.google.maps.Animation.BOUNCE);
          }
        }

        if (this.state.openWindows) {
          console.log('you have an open window, better shut it!', this.state.openWindows);
          this.closeInfWindow(this.state.openWindows);
        }


        console.log(infoWin);
        this.setState({
          openWindows: infoWin,
          showingConInfoWindow: true
        });
        infoWin.open(window.google.maps, window.markers[x]);
        toggleBounce(window.markers[x]);

        break;
      }
    }

    // activeMarker: null,
    // activeMarkerWindow: null,
    // activeMarkerProps: null,
    // showingInfoWindow: false,
  }

  closeInfWindow = (infwindow) => {
    this.state.activeMarker && this.state.activeMarker.setAnimation(null);
    infwindow.close();
    // set the state to reflect that there is no infoWindow open currently
    this.setState({
      openWindows: null
    });
    this.setState({
      showingConInfoWindow: false,
      activeConMarker: null,
      activeConMarkerProps: null
    });
  }

  componentDidMount = () => {
    LocationsAPI.getLocations()
    .then(resp => this.setState({ locations: resp }));
  }

  handleQueryChange = (queryNew) => {
    this.setState({ query: queryNew });
    LocationsAPI.getLocations(this.state.query)
    .then(resp => this.setState({ locations: resp }));
    console.log(this.state.query);
  }

  render = () => {
    return (
      <div id="content">
        <List
          locations={this.state.locations}
          showInfo={this.handleClick}
          querySearch={this.state.query}
          handleChange={this.handleQueryChange}/>
        <MapDisplay
          openWindows={this.state.openWindows}
          activeConMarker={this.state.activeConMarker}
          activeConMarkerProps={this.state.activeConMarker}
          showingConInfoWindow={this.state.showingConInfoWindow}
          locations={this.state.locations}
          lat={this.state.lat}
          lon={this.state.lon}
          zoom={this.state.zoom} />
      </div>
    );
  }
};