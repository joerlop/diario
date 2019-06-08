import React from "react";
import "./Home.scss";
import { UserSession } from "blockstack";
import { getYears } from "../../actions/index";
import Year from "./Year";
import { connect } from "react-redux";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.userSession = new UserSession();
  }

  componentDidMount() {
    this.props.getYears(this.userSession);
  }

  render() {
    return (
      <div className="Home-container">
        {this.props.postYears.map(year => (
          <Year year={year} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  postYears: state.postsReducer.postYears
});

export default connect(
  mapStateToProps,
  {
    getYears
  }
)(Home);
