import React from "react";
import "./Landing.scss";
import { Link } from "react-router-dom";
import writingImage from "../../images/Writing.jpg";
import arrow from "../../images/arrow.svg";

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
        <div className="landing-content">
          <div className="title">
            <h2>A new kind of diary.</h2>
          </div>
          <div className="howitworks">
            <div className="attr">
              <h3>Private</h3>
              <p>
                No one can see/use your data. <br/>
                We have no access to what you write.
              </p>
            </div>
            <div className="attr">
              <h3>Simple</h3>
              <p>Start writing right away.</p>
            </div>
            <div className="attr">
              <h3>Fun</h3>
              <p>
                Use emojis to give more life to what you write.
              </p>
            </div>
          </div>
          <button className="btn">Start writing!</button>
        </div>
        <div className="landing-image">
          <img src={writingImage} />
        </div>  
      </div>
    );
  }
}

export default Marketing;
