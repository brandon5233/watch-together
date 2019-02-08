import React, { Component } from 'react';
import './createRoom.css'

class CreateRoom extends Component{
    constructor(props){
        super(props);
        this.state = {
            newRoomName:'',
            isDisabled:true,
            error:''
        };
    }

    render(){
        console.log('CREATE ROOM');
        return(
                <div className="SignInFormContainer">
                    <div id="createRoomForm">
                    <form onSubmit={this.handleSubmit}>
                    <input
                            name="newRoomName"
                            type="text"
                            placeholder="Room Name"
                            onChange={this.handleChange}
                            autoFocus="true"
                            />
                            <button disabled={this.state.isDisabled} type="submit">Create!</button>
                            {/*replace css class with proper class, not SignInError */}
                            {this.state.error && <p className="SignInError">{this.state.error}</p>}
                    </form>
                    </div>
                  
                </div>
                
        );
    }
    
    handleSubmit = event => {
        event.preventDefault();
    }

    handleChange = event => {
        const isDisabled = event.target.value ===''?true:false;
        this.setState({newRoomName:event.target.value, isDisabled:isDisabled});
        
    }
}



export default CreateRoom;