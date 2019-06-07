import React, { Component } from 'react'
import './Login.css'
import { UserSession } from 'blockstack'

class Login extends Component {
  constructor() {
    super();
    this.userSession = new UserSession();
  }

  signIn(e) {
    e.preventDefault();
    this.userSession.redirectToSignIn();
    localStorage.setItem("signingIn", true)
  }

  render() {
    return (
      <div className="Login">
        {localStorage.getItem("signingIn") ? (
          <div>
            <h1>Hello!</h1>
          </div>
        ) : (
          <div className="form-signin">
            <h1 className="h1 mb-3 font-weight-normal">Animal Kingdom</h1>
            <button
              className="btn btn-lg btn-primary btn-block"
              onClick={this.signIn.bind(this)}
            >
              Sign in with Blockstack
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Login
