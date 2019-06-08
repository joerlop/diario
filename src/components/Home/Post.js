import React from 'react';

class Post extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      open: false
    }
  }

  render() {
    return (
      <div className={`Month`}>
        <p>Post data</p>
      </div>
    );
  }
}

export default Post;