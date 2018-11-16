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
    openWindow: null,
    activeConMarker: null,
    activeConMarkerProps: null,
    showingConInfoWindow: false,
    query: ''
  }

  componentDidMount = () => {
    LocationsAPI.getLocations()
    .then(resp => this.setState({ locations: resp }));
  }

  handleListClick = (loc) => {
    // List item has been clicked.

    // Check to see if a marker has already been triggered on the map.

    if ((window.activeMapMarker) || (this.state.activeConMarker)) {
      // if open marker was opened by clicking it directly on the map
      if (window.activeMapMarker) {

        if (window.activeMapMarker.title === loc.venue.name) {
          // if the open marker is the same one as the marker associated with
          // the list item clicked, all we have to do is close the marker

          this.closeInfWindow(window.activeMapWindow, window.activeMapMarker);

        } else {
          // if they are not the same, close the marker that is currently open
          // and open the new one

          this.closeInfWindow(window.activeMapWindow, window.activeMapMarker);
          this.openInfoWindow(loc);

        }

      } else if (this.state.activeConMarker) {
        // if open marker was opened by clicking the associated list item

        if ((this.state.activeConMarker.title === loc.venue.name) &&
          (this.state.activeConMarker.address === loc.venue.location.address)) {
          // if the open marker is the same one as the marker associated with
          // the list item clicked, all we have to do is close the marker
          // It's good to check that the name AND address of the locations match,
          // to prevent issues with chain businesses

          this.closeInfWindow(this.state.openWindow, this.state.activeConMarker);

        } else {
          // if they are not the same, close the marker that is currently open
          // and open the new one

          this.closeInfWindow(this.state.openWindow, this.state.activeConMarker);
          this.openInfoWindow(loc);

        }
      }

    } else {
      // If no markers were currently open, open the new one.

      this.openInfoWindow(loc);
    }

  }

  openInfoWindow = (loc) => {
    // This function will:
    // >> create an infoWindow,
    // >> set it's properties
    // >> open it,
    // >> setState
    // >> toggleBounce()
    // >> send the active marker and the open window up to the window object so
    //    it can be accessed by the Content component

    // Note: This function will be triggered when a new marker is clicked on the map,
    // regardless if one was opened previously, whether it would have been opened
    // by clicking a marker or a list item

    for (let x in window.markers) {
      // iterate through the list of markers in the window object to find one that matches

      if ((window.markers[x].title === loc.venue.name) && (window.markers[x].address === loc.venue.location.address)) {
        // once you find a match for the list item clicked, which means that
        // the name AND address have to match, to prevent issues with chain
        // businesses with multiple locations and the same name,
        // create and open the infoWindow, set the state and toggle bounce

        let infoWin = new window.google.maps.InfoWindow({
          content: `<div><a href="#">${loc.venue.name}</a>
                  <p>${loc.venue.location.address}</p></div>`
        });

        this.setState({
          openWindow: infoWin,
          activeConMarker: window.markers[x],
          activeConMarkerProps: loc,
          showingConInfoWindow: true,
        });

        infoWin.open(window.mapObject, window.markers[x]);
        this.toggleBounce(window.markers[x]);

      }
    }
  }

  closeInfWindow = (infwindow, marker) => {
    // This function will:
    // >> toggleBounce
    // >> setState
    // >> close infWindow
    // >> set window.activeMapMarker to null

    this.setState({
      openWindow: null,
      activeConMarker: null,
      activeConMarkerProps: null,
      showingConInfoWindow: false,
    });

    this.toggleBounce(marker);

    infwindow.close();

    window.activeMapMarker = null;
    window.activeMapWindow = null;

  }

  toggleBounce = (marker) => {
    // This function will remove any animation if there is one set
    // (whether it is DROP or BOUNCE)
    // or add a BOUNCE animation.

    // It is called after the markers drop, to stop the animation, and every
    // time a marker is triggered, to add or remove BOUNCE animation
    if (marker.getAnimation()) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(window.google.maps.Animation.BOUNCE);
    }
  }

  newSearch = (queryNew) => {
    this.setState({ query: queryNew });
    LocationsAPI.getLocations(this.state.query)
    .then(resp => this.setState({ locations: resp }));

    // console.log(this.state.query);
  }

  render = () => {
    return (
      <div id="content">
        <List
          locations={this.state.locations}
          showInfo={this.handleListClick}
          querySearch={this.state.query}
          handleChange={this.newSearch}/>
        <MapDisplay
          toggleBounce={this.toggleBounce}
          closeConMark={this.closeInfWindow}
          openWindow={this.state.openWindow}
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