import React from "react";
import "./Home.scss";
import { UserSession } from "blockstack";
import { getYears, getPosts } from "../../actions/index";
import Year from "./Year";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.userSession = new UserSession();
  }

  componentDidMount() {
    this.props.getYears(this.userSession);
    this.props.getPosts(this.userSession);
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
        <div className="YourPosts">
          {this.props.postYears.length == 0 ? 
          <h2>You have no posts yet!</h2>
          :
          <h2>Your posts:</h2>  
        }
        </div>
        {this.props.postYears.map(year => (
          <Year year={year} posts={this.props.posts} />
        ))}
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
