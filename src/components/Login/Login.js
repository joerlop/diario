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
            <Loader type="ThreeDots" color="#000000" height="15" width="30" />
          </div>
        ) : (
          <div className="form">
            <h2>diario</h2>
            <button
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
