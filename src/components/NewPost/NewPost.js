import React from "react";
import { connect } from "react-redux";
import NewEditor from "./NewEditor";
import { UserSession } from "blockstack";
import { savePost, getPosts, saveYear, getYears } from "../../actions/index";
import Loader from "react-loader-spinner";
import { NavLink } from "react-router-dom";
import "./NewPost.scss";

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
        data: null,
        month: null,
        year: null
      }
    };
    this.userSession = new UserSession();
  }

  componentDidMount() {
    console.log("Hello")
    const date = new Date();
    const timestamp = date.getTime();
    this.setState({
      post: {
        id: timestamp,
        date: `${day} ${months[month]} ${year}`,
        data: null,
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
    const data = localStorage.getItem("data");
    const posts = this.props.posts;
    this.setState(
      {
        post: {
          ...this.state.post,
          date: `${day} ${months[month]} ${year}`,
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

  render() {
    return (
      <div className="NewPost-container">
        <div className="Navigation">
          <a href="https://www.wearediario.com/home">Home</a>
          <h2>diario</h2>
          <NavLink className="navlink" to={`/newpost`}>
            <p>new post</p>
          </NavLink>
        </div>
        <div className="Feeling">
          <button>How are you feeling today?</button>
          <span class="ec ec-slightly-smiling-face" />
        </div>
        <div className="Editor">
          <NewEditor />
        </div>
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
