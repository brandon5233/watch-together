import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Chatwindow from './Chatwindow';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="body">
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          <Chatwindow />
        </div>
      </div>
    );
  }
}

export default App;
