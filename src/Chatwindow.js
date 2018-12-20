import React, {Component} from 'react';
import './Chatwindow.css'

class Textbox extends Component{
    constructor(props){
        super(props);
        this.state = {
            inputvalue:"",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
       
    }

    handleChange(event){
        this.setState({inputvalue: event.target.value});
    }

    handleSubmit(event){
        this.props.addtext(this.state.inputvalue);
        event.preventDefault();
    }

    render(){
        return(
            <div className="textwrapper">
                <form onSubmit={this.handleSubmit}>
                    <input className="inputtext" type="text" onChange={this.handleChange}/>
                    <input type="submit" value="Send"/>
                </form>
            </div>
            
        );
    }
}

function Textview(props){
    return(
        <div className="chathistory">
            {
                props.chathistory.map((value) =>  <p className="chattext">{value}</p>)
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
        };
    }
    render(){
        return(
            <div className="Chatwindow">
                <p> chat window goes here </p>
                <Textview chathistory={this.state.chathistory} />
                <Textbox addtext={this.addtextfn}/>
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