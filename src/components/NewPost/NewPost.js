import React from "react";
import { connect } from "react-redux";
import NewEditor from "./NewEditor";
import { UserSession } from "blockstack";
import { savePost, getPosts, saveYear, getYears } from "../../actions/index";
import Loader from "react-loader-spinner";
import { NavLink } from "react-router-dom";
import "./NewPost.scss";
import { Power1 } from "gsap/src/uncompressed/TweenMax";
import TimelineMax from "gsap/src/uncompressed/TimelineMax";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const today = new Date();

class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        id: null,
        date: null,
        data: null,
        month: null,
        year: null,
        day: null
      }
    };
    this.userSession = new UserSession();
    this.myTween = null;
    this.feeling = null;
    this.editor = null;
    this.date = null;
    this.save = null;
    this.title = null;
    this.timeline = new TimelineMax({ paused: true });
  }

  componentDidMount() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const timestamp = date.getTime();

    this.setState({
      post: {
        id: timestamp,
        date: `${day} ${months[month]} ${year}`,
        data: null,
        month: `${months[month]}`,
        year: `${year}`,
        day: `${day}`
      }
    });

    this.props.getPosts(this.userSession);
    this.props.getYears(this.userSession);
    localStorage.removeItem("signingIn");

    this.timeline
      .from(this.title, 0.5, {
        autoAlpha: 0,
        ease: Power1.easeIn
      })
      .from(this.editor, 0.25, {
        autoAlpha: 0,
        y: 25,
        ease: Power1.easeInOut
      })
      .from(this.date, 0.25, {
        autoAlpha: 0,
        ease: Power1.easeIn
      })
      .from(this.feeling, 0.25, {
        autoAlpha: 0,
        ease: Power1.easeIn
      })
      .from(this.save, 0.25, {
        autoAlpha: 0,
        ease: Power1.easeIn
      });

    this.timeline.play();
  }

  savePost = event => {
    console.log("save");
    event.preventDefault();
    const data = localStorage.getItem("data");
    const posts = this.props.posts;
    this.setState(
      {
        post: {
          ...this.state.post,
          date: `${this.state.post.day} ${this.state.post.month} ${
            this.state.post.year
          }`,
          data: data
        }
      },
      () => {
        //Check if there's a post with the same id -- if user is saving same
        //post for second time, for example
        let postIndex = -1;
        posts.map((post, index) => {
          if (post.id === this.state.post.id) {
            postIndex = index;
          }
        });

        if (postIndex === -1) {
          posts.push(this.state.post);
        } else {
          posts.splice(postIndex, 1);
          posts.push(this.state.post);
        }
        this.props.savePost(this.userSession, posts);

        const postYears = this.props.postYears;
        let yearExists = false;
        let monthExists = false;
        if (postYears.length === 0) {
          const firstYear = {
            year: this.state.post.year,
            months: [this.state.post.month]
          };
          postYears.push(firstYear);
        } else {
          postYears.map(postYear => {
            if (postYear.year === this.state.post.year) {
              yearExists = true;
              postYear.months.map(month => {
                if (month === this.state.post.month) {
                  monthExists = true;
                }
              });
            }
          });

          if (yearExists) {
            if (!monthExists) {
              postYears.map(postYear => {
                if (postYear.year === this.state.post.year) {
                  postYear.months.push(this.state.post.month);
                }
              });
            }
          } else {
            postYears.push({
              year: this.state.post.year,
              months: [this.state.post.month]
            });
          }
        }
        this.props.saveYear(this.userSession, postYears);
      }
    );
  };

  reverseTimeline = event => {
    event.preventDefault();
    this.timeline.reverse(1.5);
    const timelineDuration = this.timeline.duration() * 1000;
    console.log(timelineDuration);
    setTimeout(() => {
      this.props.history.push("/home");
    }, timelineDuration);
  };

  render() {
    return (
      <div className="NewPost-container">
        <div className="Navigation">
          <NavLink
            onClick={e => this.reverseTimeline(e)}
            className="home"
            to={`/home`}
          >
            <p>home</p>
          </NavLink>
          <h2>diario</h2>
          <NavLink className="newpost" to={`/newpost`}>
            <p>new post</p>
          </NavLink>
        </div>
        {/*<div ref={div => (this.feeling = div)} className="Feeling">
          <button>How are you feeling today?</button>
          <span class="ec ec-slightly-smiling-face" />
        </div>*/}
        <div ref={div => (this.title = div)} className="post-title">
          <input type="text" placeholder="Title" />
        </div>
        <div ref={div => (this.editor = div)} className="Editor">
          <NewEditor />
        </div>
        <div ref={div => (this.date = div)} className="Date">
          <p>{this.state.post.date}</p>
        </div>
        <div className="Below-Editor">
          <div ref={div => (this.feeling = div)} className="Feeling_2">
            <p>How are you feeling?</p>
            <span class="ec ec-slightly-smiling-face" />
          </div>
          <div ref={div => (this.save = div)} className="Save">
            <button onClick={e => this.savePost(e)}>
              {this.props.savingPost ? (
                <Loader
                  type="ThreeDots"
                  color="#000000"
                  height="10"
                  width="20"
                />
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.postsReducer.posts,
  savingPost: state.postsReducer.savingPost,
  postYears: state.postsReducer.postYears
});

export default connect(
  mapStateToProps,
  {
    savePost,
    getPosts,
    saveYear,
    getYears
  }
)(NewPost);
