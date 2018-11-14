import React from 'react';
// import locations from '../data/locations.json';

export default class List extends React.Component {
  render = () => {
    let locations = this.props.locations;

    return (
      <div id="list">
        <h2>Locations</h2>
        <p>You can search for anything within a range of Portland, OR! The default search is of course for good ramen. You're welcome!</p>
        <input type="text" placeholder="Search" value={this.props.querySearch} onChange={(e) => this.props.handleChange(e.target.value)}/>
        <p>(displaying {locations.length} results)</p>
        <p>via FourSquare!</p>
        { (locations === "Your search cannot be completed due to an error" ? <p>{locations}</p> :
          <ul>
            {
              locations.map(loc => (
                <li key={loc.venue.id}>
                  <p onClick={() => this.props.showInfo(loc)}>{loc.venue.name}</p>
                  <p>{loc.venue.location.address}</p>
                </li>
              ))
            }
          </ul>)
        }

      </div>
    );
  }
}