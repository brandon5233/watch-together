import React, {Component} from 'react';
import {FirebaseContext} from './firebase'
import { withRouter } from 'react-router-dom';
import * as ROUTES from './constants/routes'
import './signin.css'
import SignUpPage from './signup';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';


function SignIn(props){
    return(
        <div className="SignInFormContainer"> 
            <FirebaseContext.Consumer>
               {firebase => <RoutableSignInForm firebase={firebase} />}
            </FirebaseContext.Consumer>
        </div>
    );
} 

const INITIAL_STATE = {
    email : '',
    password : '',
    error : null
}

class SignInForm extends Component{
    constructor(props){
        super(props);

        this.state = {...INITIAL_STATE};
    }

    handleChange = event => {
        this.setState({
            [event.target.name]:event.target.value,
            error : ''
        });
    }

    handleSubmit = event => {
        const {email, password} = this.state;
        this.props.firebase
        .dosignInWithEmailAndPassword(email, password)
        .then(authUser =>{
            this.setState({...INITIAL_STATE});
            this.props.history.push(ROUTES.LANDING);
        })
        .catch(error =>{
            this.setState({ error });
        })
        event.preventDefault();
    }

    render(){
       const {email, password, error} = this.state;
       const isDisabled = email === "" || password.trim() ==="";
        return(
            <div className="SignInForm">
                <form onSubmit={this.handleSubmit}>
                    <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={this.handleChange}
                    />
                
                    <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.handleChange}
                    />

                    <button
                    className="SignInButton"
                    type="submit"
                    disabled={isDisabled}>
                    Login
                    </button>
                    {error && <p className="SignInError">{error.message}</p>}
                </form>
                <div className="signupInvitation">
                    <h5>Don't have an account?</h5>
                    <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
                </div>
            </div>
        );
    }
}

const RoutableSignInForm = withRouter(SignInForm);
export default SignIn;