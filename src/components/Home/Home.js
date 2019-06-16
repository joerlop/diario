import React from "react";
import "./Home.scss";
import { UserSession } from "blockstack";
import { getYears, getPosts } from "../../actions/index";
import Year from "./Year";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Power1 } from "gsap/src/uncompressed/TweenMax";
import TimelineMax from "gsap/src/uncompressed/TimelineMax";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.userSession = new UserSession();
    this.yearList = null;
    this.timeline = new TimelineMax({ paused: true });
  }

  componentDidMount() {
    this.props.getYears(this.userSession);
    this.props.getPosts(this.userSession);

    this.timeline
    .from(this.yearList, 0.5, {
      display: "none",
      autoAlpha: 0,
      delay: 0.25,
      ease: Power1.easeIn
    })
  }

  render() {
    return (
      <div className="Home-container">
        <div className="Navigation">
          <NavLink className="navlink" to={`/home`}>
            <p>home</p>
          </NavLink>
          <h2>diario</h2>
          <NavLink className="navlink" to={`/newpost`}>
            <p>new post</p>
          </NavLink>
        </div>
        <div ref={div => (this.yearList = div)} className={`YearList`}>
          {this.props.postYears.length == 0 ? (
            <h2>You have no posts yet!</h2>
          ) : (
            this.props.postYears.map(year => (
              <Year year={year} posts={this.props.posts} />
            ))
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.postsReducer.posts,
  postYears: state.postsReducer.postYears
});

export default connect(
  mapStateToProps,
  {
    getYears,
    getPosts
  }
)(Home);
