import React, { Component } from 'react';
import './Chatwindow.css'
import Button from '@material-ui/core/Button';


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
        this.props.addtext(this.state.inputvalue, this.props.username);
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
                    <input disabled={this.props.isInputDisabled} placeholder="Type a message" className="inputtext" type="text" value={this.state.inputvalue} onChange={this.handleChange} />
                    <Button disabled={this.state.isnull} style={style} variant="contained" className="button" type="submit" color='primary' >
                        Send
                    </Button>

                </form>
            </div>
        );
    }
}

function Textview(props) {
    let arr = props.chathistory.slice();
    return (
        <div className="chathistory">

            {
                arr.reverse().map((value, index) => <p key={index} className="chattext">{value}</p>)
            }
        </div>
    );
}

class Chatwindow extends Component {
    constructor(props) {
        super(props);
        this.addtextfn = this.addtextfn.bind(this);
        this.state = {
            chathistory: [],
        };
    }
    render() {

        const isInputDisabled = (this.props.username)?false:true;

        return (
            <div className="chatwindow">
                <p className="chatwindowHeading"> Chat Window </p>
                <div className="chathistory-container">
                    <Textview
                        chathistory={this.state.chathistory}
                        timestamp={new Date()}
                       />
                </div>
                <div className="inputtext">
                    <Textbox 
                        addtext={this.addtextfn} 
                        username={this.props.username}
                        isInputDisabled={isInputDisabled} />
                </div>
            </div>
        );
    }

    addtextfn(input, username) {
        let prevHistory = this.state.chathistory.slice();
        prevHistory.push(username + ":\t" + input);
        this.setState({
            chathistory: prevHistory,
        });
       
        const checkForLink = input.split('.')

        if(this.checkForLink(input)){
            console.log("link found");
            const embedURL = this.convertToEmbedURL(input);
            this.props.setSrc(embedURL);
        }
        console.log(this.state.chathistory)

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

    checkForLink(input){
        const url = input.split('.');
        if(url.length>2 && url[1].includes("yout")){
            return true;
        }
        else{
            return false;
        }
    }

    convertToEmbedURL(input){
        let embedURL = input.replace('watch?v=', 'embed/')
        embedURL = embedURL + '?autoplay=1';
        return embedURL;
    }

}



export default Chatwindow;