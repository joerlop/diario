import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./App.scss";
import { UserSession } from "blockstack";
import NewPost from "./components/NewPost/NewPost";
import Login from "./components/Login/Login";
import Marketing from "./components/Marketing/Marketing";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/Home/Home";
import { TransitionGroup, Transition } from "react-transition-group";
import { play, exit } from "./timelines";
import { NavLink } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.userSession = new UserSession();
    this.state = {
      signedIn: this.userSession.isUserSignedIn()
    };
  }

  componentWillMount() {
    console.log(this.props);
    const session = this.userSession;
    if (!session.isUserSignedIn() && session.isSignInPending()) {
      session.handlePendingSignIn().then(userData => {
        if (!userData.username) {
          throw new Error("This app requires a username.");
        }
        this.props.history.push("/newpost");
      });
    }
  }

  render() {
    return (
      <div className="App">
        <Route
          exact
          path="/newpost"
          render={(routeProps) =>
            this.userSession.isUserSignedIn()
              ? <NewPost {...routeProps} userSession={this.userSession} />
              : <Redirect to={"/login"} />
          }
        />
        <Route
          exact
          path="/home"
          render={(routeProps) =>
            this.userSession.isUserSignedIn()
              ? <Home {...routeProps} userSession={this.userSession} />
              : <Redirect to={"/login"} />
          }
        />
        <Route
          exact
          path="/login"
          render={routeProps => (
            <Login {...routeProps} userSession={this.userSession} />
          )}
        />
        <Route
          exact
          path="/"
          render={() =>
            this.userSession.isUserSignedIn()
              ? <Redirect to={"/newpost"} />
              : <Redirect to={"/login"} />
          }
        />
      </div>
    );
  }
}

export default withRouter(App);
