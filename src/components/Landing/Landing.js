import React from "react";
import "./Landing.scss";
import { Link } from "react-router-dom";

class Marketing extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="landing-container">
        <nav className="landing-navigation">
          <h1>diario</h1>
          <Link className="signing" to={`/login`}>
            <p>Sign Up/In</p>
          </Link>
        </nav>
      </div>
    );
  }
}

export default Marketing;