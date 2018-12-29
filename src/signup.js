import React, {Component} from 'react';
import {FirebaseContext} from './firebase'
import { withRouter, Link } from 'react-router-dom';
import * as ROUTES from './constants/routes'
import './signup.css'

class SignUpPage extends Component{
   
    render(){
        return(
            <div className="SignUpFormContainer">
                <FirebaseContext.Consumer>
                {firebase =>
                    <RoutableSignUpForm 
                    firebase={firebase} 
                    setUsername={this.props.setUsername} 
                    SignInToggle={this.props.SignInToggle}/>
                }
                </FirebaseContext.Consumer>
            </div>
        );
    }
}


const INITIAL_STATE = {
    username: '',
    email: '',
    password1: '',
    password2: '',
    error: null,
  };

class SignUpForm extends Component{
  
    constructor(props){
       
        super(props);
        this.state = {...INITIAL_STATE};
    }

    handleChange = event => {
        this.setState({
            [event.target.name] : event.target.value,
            error : ''
        });
    }

    handleSubmit = event => {
        const {username, email, password1} = this.state;

        this.props.firebase
        .doCreateUserWithEmailAndPassword(email, password1)
        .then(authUser => {
            this.setState({ ...INITIAL_STATE });
            this.props.setUsername(email);
            this.props.SignInToggle();
            this.props.history.push(ROUTES.LANDING); 
          })
        .catch(error => {
            this.setState({ error });
          });
        event.preventDefault();
    }

    goBack = () => {
        this.props.history.push(ROUTES.LANDING);
    }

    render(){
        const {
            username,
            email,
            password1,
            password2,
            error,
          } = this.state;

        const isInvalid = 
        password1 !== password2 ||
        password1 === '' ||
        email === '';
        {/*username === ''*/}

        return(
            <div className="SignUpForm">

                <div className="SignUpGreeting">
                    <h2>Create a new Account!</h2>
                    <h5>Its fast, easy, and Free!</h5>
                </div>

                <form onSubmit={this.handleSubmit}>

                {/*
                    <input
                    name="username"
                    value={username}
                    onChange={this.handleChange}
                    type="text"
                    placeholder="Username"
                    />
                    <br/>
                */}

                
                <input
                name="email"
                value={email}
                onChange={this.handleChange}
                type="email"
                placeholder="email"
                />
                <br/>

                <input
                name="password1"
                value={password1}
                onChange={this.handleChange}
                type="password"
                placeholder="password"
                />
                <br/>

                <input
                name="password2"
                value={password2}
                onChange={this.handleChange}
                type="password"
                placeholder="confirm password"
                />
                <br/>
                
                <div className="SignInInvitation">
                    <h5>Already have an account?</h5>
                    <Link to={ROUTES.SIGN_IN}>Sign In</Link>
                </div>
                <br/>
                <button disabled={isInvalid} type="submit">Sign Up</button>
            
                {
                /* 
                Add a cancel button here possibly with redux
                <button className="SignUpCancel" onClick={this.goBack}>Cancel</button>
                 */ 
                }
                
                
                {error && <p className="SignUpError">{error.message}</p>}
                </form>
              </div>
            
        );
    }
}

const RoutableSignUpForm = withRouter(SignUpForm); 
export default SignUpPage;
