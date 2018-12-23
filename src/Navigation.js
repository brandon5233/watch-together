import React, {Component}from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import SignUpPage from './signup';
import SignInPage from './signin';


 
class Navigation extends Component{
  constructor(props){
    super(props);
    this.state = {
      ShowSignIn : true,
    };
    console.log("State:")
    console.log(this.state)
  }

  SignInToggle = () => {
    const ShowSignIn = this.state.ShowSignIn;
    console.log('Changing state');
      this.setState({ ShowSignIn : !ShowSignIn });
  }
  
  

  render(){
    return(
      <div className="NavigationBar">
        <ul>
          <li>
            <Link to={(this.state.ShowSignIn)?ROUTES.SIGN_IN:ROUTES.LANDING} onClick={this.SignInToggle}>Sign in</Link>
          </li>
          <li>
            <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
          </li>
          <li>
            <Link to={ROUTES.LANDING}>Landing</Link>
          </li>
        </ul>

        <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />

    </div>
    );
  } 
}

export default Navigation;