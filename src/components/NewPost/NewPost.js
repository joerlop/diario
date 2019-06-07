import React from "react";
import "./NewPost.scss";
import { connect } from "react-redux";
import NewEditor from "./NewEditor";
import { UserSession } from "blockstack";
import { savePost, getPosts, saveYear, getYears } from "../../actions/index";
import Loader from "react-loader-spinner";
import { NavLink } from "react-router-dom";

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
const day = today.getDate();
const month = today.getMonth();
const year = today.getFullYear();

class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        id: null,
        date: null,
        content: null,
        value: null,
        month: null,
        year: null
      }
    };
    this.userSession = new UserSession();
  }

  componentDidMount() {
    const date = new Date();
    const timestamp = date.getTime();
    this.setState({
      post: {
        id: timestamp,
        date: `${day} ${months[month]} ${year}`,
        content: null,
        value: null,
        month: `${months[month]}`,
        year: `${year}`
      }
    });

    this.props.getPosts(this.userSession);
    this.props.getYears(this.userSession);
    localStorage.removeItem("signingIn");
  }

  savePost = event => {
    event.preventDefault();
    const content = localStorage.getItem("data");
    const value = localStorage.getItem("data");
    const posts = this.props.posts;
    this.setState(
      {
        post: {
          ...this.state.post,
          date: `${day} ${months[month]} ${year}`,
          content: content,
          value: value
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
        postYears.map(postYear => {
          if (postYear.year === this.state.post.year) {
            yearExists = true;
            postYear.months.map(month => {
              if (month === this.state.post.month) {
                monthExists = true;
              }
            })
          }
        })

        if (yearExists) {
          if (!monthExists) {
            postYears.map(postYear => {
              if (postYear.year === this.state.post.year) {
                postYear.months.push(this.state.post.month)
              }
            })    
          }
        } else {
          postYears.push({
            year: this.state.post.year,
            months: [this.state.post.month]
          })
        }

        this.props.saveYear(this.userSession, postYears);
      }
    );
  };

  render() {
    return (
      <div className="NewPost-container">
        <div className="Navigation">
          <NavLink className="navlink" to={`/home`}>
            <p>home</p>
          </NavLink>
          <h2>diario</h2>
          <NavLink className="navlink" to={`/newpost`}>
            <p>new post</p>
          </NavLink>
        </div>
        <div className="Feeling">
          <button>How are you feeling today?</button>
          <span class="ec ec-slightly-smiling-face" />
        </div>
        <NewEditor />
        <div className="Date">
          <p>{this.state.post.date}</p>
        </div>
        <div className="Save">
          <button onClick={e => this.savePost(e)}>
            {this.props.savingPost ? (
              <Loader type="ThreeDots" color="#000000" height="10" width="20" />
            ) : (
              "Save"
            )}
          </button>
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