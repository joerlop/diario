import React from "react";
import "./Home.scss";
import { UserSession } from "blockstack";
import { getYears, getPosts } from "../../actions/index";
import Year from "./Year";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Power1 } from "gsap/src/uncompressed/TweenMax";
import TimelineMax from "gsap/src/uncompressed/TimelineMax";
import Loader from "react-loader-spinner";


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.userSession = new UserSession();
    this.yearList = null;
    this.timeline = new TimelineMax({ paused: true });
  }

  componentDidMount() {
    this.props.getPosts(this.userSession);
    this.props.getYears(this.userSession).then(() => {
      this.timeline.from(this.yearList, 0.5, {
        display: "none",
        autoAlpha: 0,
        delay: 0.25,
        ease: Power1.easeIn
      });

      this.timeline.play();
      console.log(this.props.postYears)
    });
  }

  reverseTimeline = event => {
    event.preventDefault();
    this.timeline.reverse();
    const timelineDuration = this.timeline.duration()*1000;
    console.log(timelineDuration);
    setTimeout(() => {
      this.props.history.push("/newpost");
    }, timelineDuration);
  }

  render() {
    console.log(this.props.postYears)
    return (
      <div className="Home-container">
        <div className="Navigation">
          <NavLink className="home" to={`/home`}>
            <p>home</p>
          </NavLink>
          <h2>diario</h2>
          <NavLink onClick={e => this.reverseTimeline(e)} className="newpost" to={`/newpost`}>
            <p>new post</p>
          </NavLink>
        </div>
        <div ref={div => (this.yearList = div)} className={`YearList`}>
        {this.props.gettingYears ? (
              <Loader type="ThreeDots" color="#000000" height="15" width="30" />
            ) : (
              this.props.postYears.length == 0 ? (
                <div className="noposts">
                  <h2>You have no posts yet!</h2>
                  <button>Go write!</button>
                </div>
              ) : (
                this.props.postYears.map(year => (
                  <Year year={year} posts={this.props.posts} />
                ))
              )
            )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.postsReducer.posts,
  postYears: state.postsReducer.postYears,
  gettingYears: state.postsReducer.gettingYears
});

export default connect(
  mapStateToProps,
  {
    getYears,
    getPosts
  }
)(Home);
