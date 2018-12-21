import React, {Component} from 'react';
import './Chatwindow.css'
import Button from '@material-ui/core/Button';


const style = {
    marginLeft: '20px',
    marginTop: '5px',
  };


class Textbox extends Component{
    constructor(props){
        super(props);
        this.state = {
            inputvalue:"",
            isnull: true
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        let isnull = true;
        if(event.target.value){
            isnull = !isnull;
        }
        this.setState({
            inputvalue: event.target.value,
            isnull : isnull
        });
    }

    handleSubmit(event){
        this.props.addtext(this.state.inputvalue);
        event.preventDefault();
        this.setState({
            inputvalue:"",
            isnull: true
        });
    }

    render(){
        return(
            <div className="textwrapper">
                <form onSubmit={this.handleSubmit}>
                    <input placeholder="Type a message" className="inputtext" type="text" value ={this.state.inputvalue} onChange={this.handleChange}/>
                    <Button disabled={this.state.isnull} style={style} variant="contained" className="button" type="submit" color='primary' >
                        Send
                    </Button>
                    
                </form>
            </div>
        );
    }
}

function Textview(props){
    let arr=props.chathistory.slice();
    return(
        <div className="chathistory">
            
            {
    arr.reverse().map((value, index) =>  <p key={index} className="chattext">{props.username+":\t"}{value}</p>)
            }
        </div>
    );
}

class Chatwindow extends Component{
    constructor(props){
        super(props);
        this.addtextfn = this.addtextfn.bind(this);
        this.state ={
            chathistory: [],
            name: "Brandon",
            lastname: "Rozario",
            username: "brandon5233"
        };
    }
    render(){
        return(
            <div className="Chatwindow">
                <p> chat window goes here </p>
                <Textview 
                    chathistory={this.state.chathistory} 
                    timestamp={new Date()} 
                    username={this.state.username}/>
                <Textbox addtext={this.addtextfn} />
            </div>
        );
    }
    
    addtextfn(input){
        let prevHistory = this.state.chathistory.slice();
        prevHistory.push(input);
        this.setState({
            chathistory: prevHistory,
        });
        console.log(this.state.chathistory)
    
    }
}



export default Chatwindow;