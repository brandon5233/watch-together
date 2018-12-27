import React from 'react';
import {FirebaseContext} from './firebase'
import { withRouter } from 'react-router-dom';
import * as ROUTES from './constants/routes'
import './signout.css'

function SignOut(props){
    return(
        <div className="SignOutContainer">
            <FirebaseContext.Consumer>
                {firebase => <RoutableSignOut firebase={firebase} setUsername={props.setUsername} SignInToggle={props.SignInToggle}/>}
            </FirebaseContext.Consumer>
        </div>
    );
}



function SignOutAction(props){
    
    const doSignOut = () => {
        props.firebase.doSignOut()
        .then(()=>{
            props.setUsername("");
            props.SignInToggle();
            props.history.push(ROUTES.LANDING);
        })
        .catch(error => {
            console.log(error);
        })
    }    
    
    return(
        <div className="SignOutButtonContainer">
            <button 
            className="SignOutButton"
            onClick={doSignOut}>
            Sign Out
            </button>    
        </div>

    );
}

const RoutableSignOut = withRouter(SignOutAction);
export default SignOut;



