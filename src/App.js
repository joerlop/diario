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
        <div className="Navigation">
          <NavLink strict exact className="navlink" to={`/home`} key={"home"}>
            <p>home</p>
          </NavLink>
          <h2>diario</h2>
          <NavLink strict exact className="navlink" to={`/home`} key={"home"}>
            <p>new post</p>
          </NavLink>
        </div>
        <Route
          render={({ location }) => {
            const { pathname, key } = location;

            return (
              <TransitionGroup component={null}>
                <Transition
                  key={key}
                  appear={true}
                  onEnter={(node, appears) => {
                    play(pathname, node, appears);
                  }}
                  onExit={(node, appears) => exit(node, appears)}
                  timeout={{ enter: 750, exit: 150 }}
                >
                  <Switch location={location}>
                    {/*this.userSession.isUserSignedIn() ? <NewPost /> : <Login />*/}
                    <Route exact path="/" component={Marketing} />
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

export default withRouter(App);
