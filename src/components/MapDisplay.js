import React from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';
// import * as LocationsAPI from '../api/Locations';

const MAP_KEY = "AIzaSyCc2VyH-lnIua2RIpDWV0R1ApxNv-T9jyo";

class MapDisplay extends React.Component {
  state = {
    map: null,
    locMarkers: [],
    locMarkerProps: [],
    activeMarker: null,
    activeMarkerWindow: null,
    activeMarkerProps: null,
    showingInfoWindow: false,
    locate: []
  };

  componentDidMount = () => {
  }

  // code snippet from Doug Brown, Project Coach after a plea for help via Slack.
  // Thanks so much!!
  componentWillReceiveProps = props => {
    if (this.state.locate !== props.locations) {
      this.updateMarkers(props.locations, this.locate, this.state.map);
    }
  }

  mapReady = (props, map) => {
    this.setState({map});
    this.updateMarkers(this.props.locations, map);
    window.mapObject = map;
  }

  updateMarkers = (locations, locate, m) => {
    if ((locate != locations) || (locations !== "Your search cannot be completed due to an error")) {

      console.log('These are the locations sent to updateMarkers()', locations);

      // For any existing markers remove them from the map
      this.state.locMarkers.forEach(marker => marker.setMap(null));

      // create two lists, locMarkerProps and locMarkers, where for each location,
      // a marker object is created with the properties of that marker (locProps),
      // an animation, and a click eventListener
      let locMarkerProps = [];

      // check that foursquare request returned a list of location objects
      if (locations !== "Your search cannot be completed due to an error") {
        // if no error, proceed with creating the markers

        let locMarkers = locations.map((location, index) => {
          let locProps = {
            key: index,
            index,
            name: location.venue.name,
            position: {
              lat: location.venue.location.lat,
              lng: location.venue.location.lng
            },
            url: null
          };

          // add the props to the locMarkerProps list
          locMarkerProps.push(locProps);

          let marker = new this.props.google.maps.Marker({
            position: {
              lat: location.venue.location.lat,
              lng: location.venue.location.lng
            },
            map: this.state.map,
            title: location.venue.name,
            address: location.venue.location.address,
            id: location.venue.id
          });

          marker.setAnimation(this.props.google.maps.Animation.DROP);

          marker.addListener('click', () => {
            this.onMarkerClick(locMarkerProps, marker, m, null);
            // this.toggleBounce(marker); << I don't think this would work for markers triggered by list click, but I could be wrong
          });

          return marker;

        })

        this.setState({
          locMarkers,
          locMarkerProps,
          locate: locations
        });

        window.markers = locMarkers;

      }

    } else {
      // if there was an error in the foursquare request, exit
      return;
    }

  }

  onMarkerClick = (props, marker, map, e) => {
    // Marker has been clicked.

    // Check to see if a marker has already been triggered on the map.
    // If so, close it.
    if ((this.state.activeMarker) || (this.props.activeConMarker)) {
      // If yes, check to see how to properly handle the window that was previously open.

      // if (the marker is the same as the one that is already open)
      if ((this.state.activeMarker === marker) || (this.props.activeConMarker === marker)) {
        // close the marker.

        if (this.state.activeMarker) {
          // If the marker was triggered by clicking on the marker itself on the
          // map, use the appropriate function, found in `this`.

          this.closeInfoWindow(this.state.activeMarkerWindow, this.state.activeMarker);

        } else if (this.props.activeConMarker) {
          // If the marker was triggered by clicking on a list item, use the
          // appropriate function, which was passed in `this.props`.

          this.props.closeConMark(this.props.openWindow, this.props.activeConMarker);

        }

      } else {
        // the marker that was just triggered is not the same as the one that is already open.
        // close the previously triggered marker and open the new one.

        // if (the marker that is currently open was opened by list click) {
        if (this.props.activeConMarker) {

          this.props.closeConMark(this.props.openWindow, this.props.activeConMarker);

        } else {
        // in this case, the marker that is currently open was opened by directly clicking the marker on the map

          this.closeInfoWindow(this.state.activeMarkerWindow, this.state.activeMarker);

        }

        this.openInfoWindow(props, map, marker);
      }

    } else {
      // If no markers were currently open, open a new one.

      this.openInfoWindow(props, map, marker);
    }

  }

  // ===========================================================================
  // TODO:
  // >> Check openInfoWindow().
  //    Current description of how the function should work is accurate as of now.
  // >> Work on this.props.closeConMark().
  //    It needs to work in basically the same way as this.closeInfoWindow()
  // ===========================================================================

  openInfoWindow = (props, map, marker) => {
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

    let infowindow = new this.props.google.maps.InfoWindow({
      content: `<div><a href="#">${marker.title}</a>
            <p>${marker.address}</p></div>`
    });

    infowindow.open(map, marker);

    this.setState({
      showingInfoWindow: true,
      activeMarker: marker,
      activeMarkerWindow: infowindow,
      activeMarkerProps: props
    });

    this.toggleBounce(marker);

    window.activeMapMarker = marker;
    window.activeMapWindow = infowindow;

    console.log(window.activeMapMarker);
    console.log(window.activeMapWindow);

  }

  closeInfoWindow = (inwindow, marker) => {
    // This function will:
    // >> toggleBounce
    // >> setState
    // >> close inWindow
    // >> set window.activeMapMarker to null

    this.setState({
      activeMarker: null,
      activeMarkerWindow: null,
      activeMarkerProps: null,
      showingInfoWindow: false
    });

    this.toggleBounce(marker);

    inwindow.close();

    window.activeMapMarker = null;
    window.activeMapWindow = null;

  }

  toggleBounce = (mark) => {
    // This function will remove any animation if there is one set
    // (whether it is DROP or BOUNCE)
    // or add a BOUNCE animation.

    // It is called after the markers drop, to stop the animation, and every
    // time a marker is triggered, to add or remove BOUNCE animation
    if (mark.getAnimation() == this.props.google.maps.Animation.BOUNCE) {
      mark.setAnimation(null);
    } else {
      mark.setAnimation(this.props.google.maps.Animation.BOUNCE);
    }
  }

  render = () => {
    const style = {
      width: '60%',
      height: 'calc(100vh - 77px)',
      transform: 'translateX(40vw)',
    }

    const center = {
      lat: this.props.lat,
      lng: this.props.lon
    }

    return (
      <Map
        id="map"
        google={this.props.google}
        zoom={this.props.zoom}
        style={style}
        initialCenter={center}
        role="application"
        aria-label="map"
        onReady={this.mapReady}
        onClick={() => {
          if(this.state.activeMarkerWindow) {
            this.closeInfoWindow(this.state.activeMarkerWindow, this.state.activeMarker)
          }
        }}
      />
    );
  }
}

export default GoogleApiWrapper({
    apiKey: MAP_KEY
})(MapDisplay);