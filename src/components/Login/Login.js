import React, { Component } from 'react'
import './Login.scss'
import { UserSession } from 'blockstack'
import Loader from "react-loader-spinner";

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
          <div className="loading">
            <h2>diario</h2>
            <Loader type="ThreeDots" color="#000000" height="15" width="30" />
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
