/* eslint-disable */ 
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Chatwindow from './Chatwindow';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './Navigation.js';
import YoutubePlayer from './youtube-player'
import WebSocketClient from './ws-client';
const util = require('util')
class App extends Component {
    constructor(props) {
    super(props);
    this.state = {
      username: '',
      src : "",
      isOpen:false,
      chathistory : [{"from":"brandon", "message":"hi there"}]
    }
    console.log("app-chathistory: " + util.inspect(this.state.chathistory));
    this.initConnection();
  }
  websocket = new WebSocket('ws://0.0.0.0:8000');
  
  setUsername = (newName) => {
    console.log("setting username to " + newName);
    this.setState({
      username: newName
    });
  }

  ChangeSrc = (NewSrc) => {
    this.setState({
      src : NewSrc
    });
  }

  sendMessage = (msg) => {
    if(this.state.isOpen){
      this.sendMessage();
      console.log("MSG SENT !");
    }   
  }
  
  setHistory = (newchathistory) => {
    this.setState({chathistory : (newchathistory)});
    console.log("app-chathistory changed to:" + util.inspect(this.state.chathistory));
  }

  initConnection(){

  this.websocket.onopen = () => {
    console.log("websocket has been opened");
    this.setState({isOpen:true});
    
  }

    //onMessage
    this.websocket.onmessage = (serverResponse) => {
      console.log("message received");
      console.log("message:" + util.inspect(JSON.parse(serverResponse.data).data));
      const msg = JSON.parse(serverResponse.data);
      if(msg.type == 'chathistory'){
        console.log("setting history");
        this.setHistory(msg.data);
      }
      if(msg.type == 'initial'){

      }
      if(msg.type == 'message'){

      }
      if(msg.type == 'error'){

      }
    }
    /*
    if msg.type = history {
      updateChatcomponent
    }
    msg.type  = msg{
      add msg
    }
    msg.type = error {

    }
    msg.type = video{
      update vid component;
    }*/

    this.websocket.onclose = () => {
      this.setState({isOpen:false});
    }
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
          <Chatwindow setSrc={this.ChangeSrc} username={this.state.username} chathistory={this.state.chathistory}/>
        </div>

        <div className="YoutubePlayerContainer">
          <YoutubePlayer src={this.state.src} />
        </div>

      </div>
      
    );
  }

  componentDidMount(){
    
  }

}

export default App;
