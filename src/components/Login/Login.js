import React, { Component } from "react";
import "./Login.scss";
import { UserSession } from "blockstack";
import Loader from "react-loader-spinner";

class Login extends Component {
  constructor() {
    this.state = {
      signingIn: false
    };
    super();
    this.userSession = new UserSession();
  }

  signIn(e) {
    e.preventDefault();
    this.userSession.redirectToSignIn();
    localStorage.setItem("signingIn", true);
  }

  toggleSignIn = event => {
    event.preventDefault();
    this.setState({
      signingIn: !this.state.signingIn
    });
  };

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
              onClick={event => {
                this.signIn.bind(this);
                this.toggleSignIn(event);
              }}
            >
              {this.state.signingIn ? (
                <Loader
                  type="ThreeDots"
                  color="#000000"
                  height="10"
                  width="20"
                />
              ) : (
                "Sign in with Blockstack"
              )}
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Login;
