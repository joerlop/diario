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
      <div
        className={`Post`}
        dangerouslySetInnerHTML={{ __html: this.props.post.data }}
      >
        <p className="day">{this.props.post.day}</p>
      </div>
    );
  }
}

export default Post;
