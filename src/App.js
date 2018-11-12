import React, { Component } from 'react';
import Header from './components/Header';
import Content from './components/Content';
import './App.css';

class NeighApp extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Content/>
      </div>
    );
  }
}

export default NeighApp;
