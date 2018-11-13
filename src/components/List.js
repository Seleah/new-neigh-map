import React from 'react';
// import locations from '../data/locations.json';

export default class List extends React.Component {
  render = () => {
    let locations = this.props.locations;

    return (
      <div id="list">
        <h2>Locations</h2>
        <input type="text"/>
        <ul>
          {
            locations.map(loc => (
              <li>{loc.venue.name}</li>
            ))
          }
        </ul>
      </div>
    );
  }
}