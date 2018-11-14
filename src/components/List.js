import React from 'react';
// import locations from '../data/locations.json';

export default class List extends React.Component {
  render = () => {
    let locations = this.props.locations;

    return (
      <div id="list">
        <h2>Locations</h2>
        <input type="text" value={this.props.querySearch} onChange={(e) => this.props.handleChange(e.target.value)}/>
        <ul>
          {
            locations.map(loc => (
              <li key={loc.venue.id}>
                <p onClick={() => this.props.showInfo(loc)}>{loc.venue.name}</p>
                <p>{loc.venue.location.address}</p>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}