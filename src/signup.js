import React, {Component} from 'react';
import {FirebaseContext} from './firebase'
import { Link, withRouter } from 'react-router-dom';
import * as ROUTES from './constants/routes'


class SignUpPage extends Component{
    render(){
        return(
            <div>
                <p>SignUpPage</p>
                <FirebaseContext.Consumer>
                {firebase =><RoutableSignUpForm firebase={firebase}/>}
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
        this.setState({[event.target.name] : event.target.value});
        console.log("handlechange: ")
        console.log(this.state);
    }

    handleSubmit = event => {
        const {username, email, password1} = this.state;

        console.log("onSubmit")
        console.log(this.state);

        this.props.firebase
        .doCreateUserWithEmailAndPassword(email, password1)
        .then(authUser => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push(ROUTES.LANDING); 
          })
        .catch(error => {
            this.setState({ error });
            console.log(this.state);
          });
        console.log("prevent default");
        event.preventDefault();
        console.log(this.state);
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
        email === '' ||
        username === '';

        return(

            <form onSubmit={this.handleSubmit}>

            <input
                name="username"
                value={username}
                onChange={this.handleChange}
                type="text"
                placeholder="Username"
            />
        
            <br/>

            <input
            name="email"
            value={email}
            onChange={this.handleChange}
            type="text"
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
            <button disabled={isInvalid} type="submit">Sign Up</button>

            {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const RoutableSignUpForm = withRouter(SignUpForm); 
export default SignUpPage;
