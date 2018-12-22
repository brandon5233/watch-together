import React, {Component} from 'react';
import {FirebaseContext} from './firebase'
import { withRouter } from 'react-router-dom';
import * as ROUTES from './constants/routes'

function SignIn(props){
    return(
        <div>
            <p>SignIn Page</p>
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
        this.setState({[event.target.name]:event.target.value});
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
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={this.handleChange}
                    />
                    <br/>
                    
                    <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.handleChange}
                    />
                    <br/>

                    <button
                    type="submit"
                    disabled={isDisabled}>
                    Login
                    </button>
                    <br/>

                    {error && <p>{error.message}</p>}
                </form>
            </div>
        );
    }
}

const RoutableSignInForm = withRouter(SignInForm);
export default SignIn;