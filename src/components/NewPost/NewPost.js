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
        day: null,
        feelings: {
          happy: false,
          normal: false,
          angry: false,
          sad: false
        } 
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
        day: `${day}`,
        feelings: {
          happy: false,
          normal: false,
          angry: false,
          sad: false
        } 
      }
    });

    this.props.getPosts(this.userSession).then(() => {
      this.props.getYears(this.userSession).then(() => {
        this.timeline
          .from(this.title, 0.4, {
            autoAlpha: 0,
            delay: 0.3,
            ease: Power1.easeIn
          })
          .from(this.editor, 0.4, {
            autoAlpha: 0,
            y: 25,
            ease: Power1.easeInOut
          })
          .from(this.feeling, 0.3, {
            autoAlpha: 0,
            ease: Power1.easeIn
          })
          .from(this.save, 0.3, {
            autoAlpha: 0,
            ease: Power1.easeIn
          })
          .from(this.date, 0.3, {
            delay: 0.3,
            autoAlpha: 0,
            ease: Power1.easeIn
          });
        this.timeline.play();
      });
    });

    /*if (!this.props.gettingPostsError && !this.props.gettingYearsError) {

    }*/

    localStorage.removeItem("signingIn");
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
    this.timeline.reverse().timeScale(2);
    const timelineDuration = this.timeline.duration() * 1000/2;
    console.log(timelineDuration);
    setTimeout(() => {
      this.props.history.push("/home");
    }, timelineDuration);
  };

  toggleFeeling = (event, feeling) => {
    event.preventDefault();

    let currentFeeling = null;
    if (feeling == "happy") {
      currentFeeling = this.state.post.feelings.happy;
    } else if (feeling == "normal") {
      currentFeeling = this.state.post.feelings.normal;
    } else if (feeling == "angry") {
      currentFeeling = this.state.post.feelings.angry;
    } else {
      currentFeeling = this.state.post.feelings.sad;
    }

    this.setState({
      post: {
        ...this.state.post,
        feelings: {
          ...this.state.post.feelings,
          [feeling]: !currentFeeling
        }
      }
    })
  }

  render() {
    const {happy, normal, angry, sad } = this.state.post.feelings;

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

        {this.props.gettingYears || this.props.gettingPosts ? (
          <div className="Loading">
            <div className="Loader">
              <Loader type="ThreeDots" color="#000000" height="15" width="30" />
            </div>
          </div>
        ) : this.props.gettingPostsError || this.props.gettingYearsError ? (
          <div className="Error">
            <p>
              Oops! We had a problem retrieving your info. Please try again
              later.
            </p>
          </div>
        ) : (
          <>
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
              <div ref={div => (this.feeling = div)} className="Feeling">
                <p>How are you feeling?</p>
                <div onClick={e => this.toggleFeeling(e, "happy")} className={`emoji-${happy}`}>
                  <span class="ec ec-sunglasses"></span>
                </div>
                <div onClick={e => this.toggleFeeling(e, "normal")} className={`emoji-${normal}`}>
                  <span class="ec ec-neutral-face"></span>
                </div>
                <div onClick={e => this.toggleFeeling(e, "angry")} className={`emoji-${angry}`}>
                  <span class="ec ec-rage"></span>
                </div>
                <div onClick={e => this.toggleFeeling(e, "sad")} className={`emoji-${sad}`}>
                  <span class="ec ec-disappointed"></span>
                </div>
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
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.postsReducer.posts,
  savingPost: state.postsReducer.savingPost,
  postYears: state.postsReducer.postYears,
  gettingPostsError: state.postsReducer.gettingPostsError,
  gettingYearsError: state.postsReducer.gettingYearsError,
  gettingPosts: state.postsReducer.gettingPosts,
  gettingYears: state.postsReducer.gettingYears
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
