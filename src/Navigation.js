import React, {Component}from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css'
import { Route } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import SignUpPage from './signup';
import SignInPage from './signin';
import SignOut from './signout';


 


class Navigation extends Component{
  constructor(props){
    super(props);
    this.state = {
      ShowSignIn : true,
    };
  }


  SignInToggle = () => {
      const ShowSignIn = this.state.ShowSignIn;
      console.log('Changing state to ' + !ShowSignIn);
      this.setState({ ShowSignIn : !ShowSignIn });
  }
    
  
  
  setButtonLink = () => {
    if(this.state.ShowSignIn){
      if(this.props.username){
        return ROUTES.SIGN_OUT;
      }
      else{
        return ROUTES.SIGN_IN;
      }
    }else{
        return ROUTES.LANDING;
      }
  }

  

  render(){
    
    return(
      <div className="NavigationBar">
        <ul>
          <li>
            <Link to={this.setButtonLink()} onClick={this.SignInToggle}>{this.props.username || "Sign In"}</Link>
          </li>
        </ul>

      
        <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route exact path={ROUTES.SIGN_IN} 
          render={()=>
            <SignInPage 
            setUsername={this.props.setUsername} 
            SignInToggle={this.SignInToggle}/>
          }  
        />
        
        <Route exact path={ROUTES.SIGN_OUT} 
          render={()=>
            <SignOut 
            setUsername={this.props.setUsername} 
            SignInToggle={this.SignInToggle} />
          }
        />

    </div>
    );
  } 
}

export default Navigation; 