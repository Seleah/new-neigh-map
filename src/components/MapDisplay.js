import React from 'react';
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import * as LocationsAPI from '../api/Locations';

const MAP_KEY = "AIzaSyCc2VyH-lnIua2RIpDWV0R1ApxNv-T9jyo";

class MapDisplay extends React.Component {
  state = {
  // initialize map
      map: null,
      locMarkers: [],
      locMarkerProps: [],
      activeMarker: null,
      activeMarkerWindow: null,
      activeMarkerProps: null,
      showingInfoWindow: false,
      locations: this.props.locations
  };

  componentDidMount = () => {
  }

  // code snippet from Doug Brown, Project Coach after a plea for help via Slack. Thanks so much!!
  componentWillReceiveProps = props => {
    this.updateMarkers(props.locations, this.state.map);
  }

  mapReady = (props, map) => {
    // console.log(this.props.locations);
    this.setState({map});

    this.updateMarkers(this.props.locations, map);
  }

  updateMarkers = (locations, m) => {
    // if (!locations) {
    //   // return;
    //   LocationsAPI.getLocations()
    //   .then(resp => this.setState({ locations: resp }));
    // }

    console.log('These are the locations sent to updateMarkers()', locations);

    // For any existing markers remove them from the map
    this.state.locMarkers.forEach(marker => marker.setMap(null));

    // create two lists, locMarkerProps and locMarkers, where for each location, a marker object is created with the properties of that marker (locProps), an animation, and a click eventListener
    let locMarkerProps = [];
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
      // console.log(locProps);
      // add the props to the locMarkerProps list
      locMarkerProps.push(locProps);

      let defaultAnimation = this.props.google.maps.Animation.DROP;
      let marker = new this.props.google.maps.Marker({
        position: {
          lat: location.venue.location.lat,
          lng: location.venue.location.lng
        },
        map: this.state.map,
        title: location.venue.name,
        address: location.venue.location.address,
        defaultAnimation
      });
      console.log(marker);


      // let toggleBounce = () => {
      //   if (marker.getAnimation() !== null) {
      //     marker.setAnimation(null);
      //   } else {
      //     marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
      //   }
      // }

      marker.addListener('click', () => {


        this.onMarkerClick(locMarkerProps, marker, m, null);
        // toggleBounce();
      });

      console.log(marker);
      return marker;
    })

    this.setState({locMarkers, locMarkerProps});

  }

  onMarkerClick = (props, marker, map, e) => {
    console.log('Marker click event:', marker);
    // see if there is an open infoWindow
    if(this.state.showingInfoWindow) {
      console.log('There is already an infoWindow open!');
      // if there is an open infoWindow
      // check to see if the marker that is showing is the same marker that you just clicked
      if(this.state.activeMarker !== marker) {
        console.log('You clicked a different marker!');
        // if the marker you just clicked is not the same marker that already has an infoWindow open, close the currently open infoWindow and open a new infoWindow for the marker that was just clicked
        this.closeInfoWindow(this.state.activeMarkerWindow);
        // create a new infoWindow
        let infowindow = new this.props.google.maps.InfoWindow({
          content: `<div><a href="#">${marker.title}</a>
                <p>${marker.address}</p></div>`
        });
        console.log('infowindow created:', infowindow);
        // set the current state to show the current active marker
        this.setState({
          showingInfoWindow: true,
          activeMarker: marker,
          activeMarkerWindow: infowindow,
          activeMarkerProps: props
        });
        // open the new infoWindow
        infowindow.open(map, marker);
      } else {
        console.log('You clicked the same marker twice in a row!');
        this.closeInfoWindow(this.state.activeMarkerWindow);
      }
    } else {
      console.log('Here should be the first infoWindow.')
      // if there is currently no infoWindow open, create a new one
      let infowindow = new this.props.google.maps.InfoWindow({
        content: `<div><a href="#">${marker.title}</a>
                <p>${marker.address}</p></div>`
      });
      console.log('infowindow created:', infowindow);
      // set the current state to show the current active marker
      this.setState({
        showingInfoWindow: true,
        activeMarker: marker,
        activeMarkerWindow: infowindow,
        activeMarkerProps: props
      });
      // open the new infoWindow
      infowindow.open(map, marker);
    }
  }

  closeInfoWindow = (window) => {
  // Disable any active marker
    this.state.activeMarker && this.state.activeMarker.setAnimation(null);
    // close the open infoWindow
    window.close();
    // set the state to reflect that there is no infoWindow open currently
    this.setState({
      showingInfoWindow: false,
      activeMarker: null,
      activeMarkerProps: null
    });
  }

  render = () => {
    const style = {
      width: '100%',
      height: '100%'
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
        onClick={this.closeInfoWindow} />


        // <Marker onClick={this.onMarkerClick}
        //         name={'Current location'} />

        // <InfoWindow onClose={this.onInfoWindowClose}>
        //     <div>
        //       <h1>{this.state.selectedPlace.name}</h1>
        //     </div>
        // </InfoWindow>
      // </Map>
    );
  }
}

export default GoogleApiWrapper({
    apiKey: MAP_KEY
})(MapDisplay);