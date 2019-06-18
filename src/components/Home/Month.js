import React from "react";
import Post from "./Post";

class Month extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleToggle(e) {
    e.preventDefault();
    this.setState({
      open: !this.state.open,
      height: this.refs.inner.clientHeight
    });
    this.props.updateHeightYear();
  }

  render() {
    const { open, height } = this.state;
    const currentHeight = open ? height : 0;

    return (
      <div onClick={e => this.handleToggle(e)} className={`Month`}>
        <h3>{this.props.month}</h3>
        <div className={`PostList`} style={{ height: currentHeight + "px" }}>
          <div className="Post-Container" ref="inner">
            {this.props.posts.map(post => {
              if (
                post.year === this.props.year &&
                post.month === this.props.month
              ) {
                return <Post post={post} />;
              }
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Month;
