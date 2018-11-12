import React from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';
import locations from '../data/locations.json';

const MAP_KEY = "AIzaSyCc2VyH-lnIua2RIpDWV0R1ApxNv-T9jyo";

class MapDisplay extends React.Component {
  state = {
  // initialize map
      map: null,
      markers: [],
      markerProps: [],
      activeMarker: null,
      activeMarkerProps: null,
      showingInfoWindow: false
  };

  componentDidMount = () => {
  }

  mapReady = (props, map) => {
      console.log(props.locations);
      this.setState({map});
      // this.updateMarkers(this.props.locations);
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