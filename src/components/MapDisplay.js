import React from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';
import locations from '../data/locations.json';

const MAP_KEY = "AIzaSyCc2VyH-lnIua2RIpDWV0R1ApxNv-T9jyo";

class MapDisplay extends React.Component {
  state = {
  // initialize map
      map: null,
      locMarkers: [],
      locMarkerProps: [],
      activeMarker: null,
      activeMarkerProps: null,
      showingInfoWindow: false
  };

  componentDidMount = () => {
  }

  updateMarkers = (locations) => {
    if (!locations) {
      return;
    }

    // For any existing markers remove them from the map
    this.state.locMarkers.forEach(marker => marker.setMap(null));

    // create two lists, locMarkerProps and locMarkers, where for each location, a marker object is created with the properties of that marker (locProps), an animation, and a click eventListener
    let locMarkerProps = [];
    let locMarkers = locations.map((location, index) => {
      let locProps = {
        key: index,
        index,
        name: location.name,
        position: location.pos,
        url: location.url
      };
      // add the props to the locMarkerProps list
      locMarkerProps.push(locProps);

      let defaultAnimation = this.props.google.maps.Animation.DROP;
      let marker = new this.props.google.maps.Marker({
        position: location.pos,
        map: this.state.map,
        defaultAnimation
      });

      // let toggleBounce = () => {
      //   if (marker.getAnimation() !== null) {
      //     marker.setAnimation(null);
      //   } else {
      //     marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
      //   }
      // }

      marker.addListener('click', () => {
        this.onMarkerClick(locMarkerProps, marker, null);
        // toggleBounce();
      });

      return marker;
    })

    this.setState({locMarkers, locMarkerProps});

  }

  mapReady = (props, map) => {
      console.log(this.props.locations);
      this.setState({map});
      this.updateMarkers(this.props.locations);
  }

  closeInfoWindow = () => {
  // Disable any active marker
    this.state.activeMarker && this.state.activeMarker.setAnimation(null);
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