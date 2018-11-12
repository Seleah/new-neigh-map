import React from 'react';
import locations from '../data/locations.json';

export default class List extends React.Component {
  render = () => {
    return (
      <div id="list">
        <h2>Locations</h2>
        <ul>
          <li>{locations[0].name}</li>
          <li>{locations[1].name}</li>
        </ul>
      </div>
    );
  }
}