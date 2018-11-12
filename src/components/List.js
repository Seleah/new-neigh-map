import React from 'react';
import locations from '../data/locations.json';

export default class List extends React.Component {
  render = () => {
    return (
      <ul>
        <li>{locations[0].name}</li>
        <li>{locations[1].name}</li>
      </ul>
    );
  }
}