import React from "react";

class Post extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      open: false
    };
  }

  render() {
    return (
      <div className="Post">
        <div
          className={`Content`}
          dangerouslySetInnerHTML={{ __html: this.props.post.data }}
        />
        <div className="Characteristics">
          <p>{this.props.post.day}</p>
        </div>
      </div>
    );
  }
}

export default Post;
