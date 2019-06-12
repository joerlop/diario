import React, { Component } from "react";
import "./App.scss";
import { UserSession } from "blockstack";
import NewPost from "./components/NewPost/NewPost";
import Login from "./components/Login/Login";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/Home/Home";
import { TransitionGroup, Transition } from "react-transition-group";
import { play, exit } from "./timelines";

class App extends Component {
  constructor() {
    super();
    this.userSession = new UserSession();
  }

  componentWillMount() {
    console.log("hello");
    const session = this.userSession;
    if (!session.isUserSignedIn() && session.isSignInPending()) {
      session.handlePendingSignIn().then(userData => {
        if (!userData.username) {
          throw new Error("This app requires a username.");
        }
        window.location = `/newpost`;
      });
    }
  }

  render() {
    return (
      <div className="App">
        <Route
          render={({ location }) => {
            const { pathname, key } = location;

            return (
              <TransitionGroup component={null}>
                <Transition
                  key={key}
                  appear={true}
                  onEnter={(node, appears) => {
                    console.log(node);
                    play(pathname, node, appears);
                  }}
                  onExit={(node, appears) => exit(node, appears)}
                  timeout={{ enter: 750, exit: 150 }}
                >
                  <Switch location={location}>
                    {/*this.userSession.isUserSignedIn() ? <NewPost /> : <Login />*/}
                    <Route
                      exact
                      path="/newpost"
                      render={routeProps => (
                        <NewPost
                          {...routeProps}
                          userSession={this.userSession}
                        />
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
                    {
                      <Route
                        exact
                        path="/"
                        render={() =>
                          this.userSession.isUserSignedIn() ? (
                            <Redirect to="/newpost" />
                          ) : (
                            <Redirect to="/login" />
                          )
                        }
                      />
                    }
                  </Switch>
                </Transition>
              </TransitionGroup>
            );
          }}
        />
      </div>
    );
  }
}

export default App;
