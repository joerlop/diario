import React from "react";
import Post from "./Post";

class Month extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      open: false
    };
  }

  toggleMonthOpen = () => {
    this.setState({
      open: !this.state.open
    });
  };

  render() {
    return (
      <div className={`Month`}>
        <h3 onClick={() => this.toggleMonthOpen()}>{this.props.month}</h3>
        <div className={`PostList-${this.state.open}`}>
          {this.props.posts.map(post => {
            if (post.year === this.props.year && post.month === this.props.month) {
              <Post post={post}/>
            }
          })}
        </div>
      </div>
    );
  }
}

export default Month;
