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
              <li key={loc.venue.id}>
                <a href="#"><h3>{loc.venue.name}</h3></a>
                <p>{loc.venue.location.address}</p>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}