import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from './Navigation.js';
import * as ROUTES from './constants/routes'






class App extends Component {
    
  render() {
    return (
      <div className="App">
        <div className="Navbar-container">
          <img src={logo} className="App-logo" alt="logo" />
          <Router>
            <div>
              <Navigation />
              
            </div>
          </Router>
        </div>
      
      <div className="App-header">
          <h2>Welcome to WatchTogether</h2>
          <h4>A React website to watch Youtube videos TOGETHER</h4>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
