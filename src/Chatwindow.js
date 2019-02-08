import React, { Component } from 'react';
import './Chatwindow.css'
import Button from '@material-ui/core/Button';
const util = require('util');
const style = {
    marginLeft: '20px',
    marginTop: '5px',
};


class Textbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputvalue: "",
            isnull: true,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let isnull = true;
        if (event.target.value) {
            isnull = !isnull;
        }
        this.setState({
            inputvalue: event.target.value,
            isnull: isnull
        });
    }

    handleSubmit(event) {
        this.props.sendMessage(this.state.inputvalue)
        event.preventDefault();
        this.setState({
            inputvalue: "",
            isnull: true
        });
    }

    render() {
        return (
            <div className="textwrapper">
                <form onSubmit={this.handleSubmit}>
                    <input 
                        disabled={this.props.isInputDisabled} 
                        placeholder={(this.props.isInputDisabled)?"Login to Chat": "Type a message"} 
                        className="inputtext" type="text" value={this.state.inputvalue} 
                        onChange={this.handleChange} />
                    <Button disabled={this.state.isnull} style={style} variant="contained" className="button" type="submit" color='primary' >
                        Send
                    </Button>

                </form>
            </div>
        );
    }
}

class Textview extends Component {

    render(){
        let arr = this.props.chathistory.slice();
    return (
        <div className="chathistory" >
            <div >
                {
                    arr.map((value, index) => <p key={index} className="chattext">{value.from}: {value.message}</p>)
                }
            </div>
            <div ref={(endRef) => {this.messageEnd = endRef;}}>
            </div>
        </div>
    );
    }
    
    scrollToEnd = () => {
        this.messageEnd.scrollIntoView({behavior:"smooth"})
    }

    componentDidMount(){
        this.scrollToEnd();
        console.log("SCROLLED !!");
    }
    componentDidUpdate(){
        this.scrollToEnd();
    }
}

class Chatwindow extends Component {

    render() {
        
        const isInputDisabled = (this.props.username)?false:true;
        console.log("chat-chathistory: " + util.inspect(this.props.chathistory));
        return (
            <div className="chatwindow">
                <p className="chatwindowHeading"> Chat Window </p>
                <div className="chathistory-container">
                    <Textview
                        chathistory={this.props.chathistory}
                        timestamp={new Date()}
                       />
                </div>
                <div className="inputtext">
                    <Textbox 
                        sendMessage={this.props.sendMessage}
                        isInputDisabled={isInputDisabled} />
                </div>
            </div>
        );
    }

  
    /*
    use a regex to better this function
    checkForLink(input){
        const splitUrl = input.split('.');
        if((splitUrl[0] == 'https://youtu' && splitUrl[1].includes('be/')) || 
            splitUrl[0] == "https://youtube" && splitUrl[1].includes('com/')){
                return true;
        }else{
            return false;
        }
    }*/

   



}



export default Chatwindow;