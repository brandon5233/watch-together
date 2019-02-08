/* eslint-disable */ 
import React, { Component } from 'react';

class WebSocketClient extends Component{
    constructor(props){
        super(props);
      // this.establlishWebSocketConnection();
}

render(){
    return(
        <div>

        </div>
    );
}


componentDidMount(){
    const websocket = new WebSocket('ws://0.0.0.0:8000');
    websocket.onopen = () => {
        console.log('socket connection established');
    }
    websocket.onmessage = (message) => {
        console.log(message);
    }
    websocket.send("hi");
    }
}

export default WebSocketClient;