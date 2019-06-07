import React, { Component } from 'react'
import './App.scss'
import { UserSession } from 'blockstack'
import NewPost from "./components/NewPost/NewPost";
import Login from "./components/Login/Login"
import { Route, Redirect } from "react-router-dom";
import Home from "./components/Home/Home"

class App extends Component {
  constructor() {
    super();
    this.userSession = new UserSession();
  }

  componentWillMount() {
    console.log("hello");
    const session = this.userSession
    if(!session.isUserSignedIn() && session.isSignInPending()) {
      session.handlePendingSignIn()
      .then((userData) => {
        if(!userData.username) {
          throw new Error('This app requires a username.')
        }
        window.location = `/newpost`
      })
    }
  }

  render() {
    return (
      <div className="App">
        {/*this.userSession.isUserSignedIn() ? <NewPost /> : <Login />*/}
        {<Route
          exact
          path="/"
          render={() =>
            this.userSession.isUserSignedIn() ? (
              <Redirect to="/newpost" />
            ) : (
              <Redirect to="/login" />
            )
          }
        />}
        <Route
          exact
          path="/newpost"
          render={routeProps => (
            <NewPost {...routeProps} userSession={this.userSession} />
          )}
        />
        <Route
          exact
          path="/home"
          render={routeProps => (
            <Home {...routeProps} userSession={this.userSession} />
          )}
        />
        <Route
          exact
          path="/login"
          render={routeProps => (
            <Login {...routeProps} userSession={this.userSession} />
          )}
        />
      </div>
    );
  }
}

export default App
