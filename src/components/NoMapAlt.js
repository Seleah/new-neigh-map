import React from 'react';
import homer from '../images/homer.png';

export default class NoMapDisplay extends React.Component {
  state = {
    showingErr: false,
    timeout: null
  }

  componentDidMount = () => {
    // start an appropriate amount of time
    let timeout = window.setTimeout(this.showErrMessage, 5000);
    this.setState({
      timeout
    });
  }

  componentWillUnmount = () => {
    // when the map loads, clear the timer
    window.clearTimeout(this.state.timeout);
  }

  showErrMessage = () => {
    this.setState({
      showingErr: true
    });
  }

  render = () => {
    return (
       <div>
        {
          this.state.showingErr ? (

            <div id="err">
              <span><img src={homer}/></span>
              <span>
                <div>
                  <h2>Error loading map</h2>
                  <hr/>
                  <p>Could not load map due to a network error.<br/>Check your internet connection and try again.</p>
                </div>
              </span>
            </div>

          ) : (<div id="loading"><h1>Loading<span id="anim-ellipsis"><span>.</span><span>.</span><span>.</span></span></h1></div>)
      } </div>
    )
  }
}