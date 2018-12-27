import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Chatwindow from './Chatwindow';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './Navigation.js';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    }
  }

  setUsername = (newName) => {
    console.log("setting username to " + newName);
    this.setState({
      username: newName
    });
  }

  render() {
    return (
      <div className="App">
        <div className="Navbar-container">
          <img src={logo} className="App-logo" alt="logo" />
          <Router>
            <div>
              <Navigation setUsername={this.setUsername} username={this.state.username} />
            </div>
          </Router>
        </div>

        <div className="App-header">
          <h2>Welcome to WatchTogether</h2>
          <h5>A React website to watch Youtube videos TOGETHER</h5>
        </div>

        <div className="chatwindow-container">
          <Chatwindow />
        </div>
      </div>
      
    );
  }
}

export default App;
