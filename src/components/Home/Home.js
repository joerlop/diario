import React from "react";
import "./Home.scss";
import { UserSession } from "blockstack";
import { getYears, getPosts } from "../../actions/index";
import Year from "./Year";
import { connect } from "react-redux";
import $ from 'jquery';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.userSession = new UserSession();
  }

  componentDidMount() {
    this.props.getYears(this.userSession);
    this.props.getPosts(this.userSession);
    this.$el = $(this.el);
  }

  render() {
    return (
      <div className="Home-container"  ref={el => this.el = el}>
        {this.props.postYears.map(year => (
          <Year el={this.$el} year={year} posts={this.props.posts}/>
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
    getYears, getPosts
  }
)(Home);
