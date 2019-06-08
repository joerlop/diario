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
          {/*filter posts that belong to year and month
            This component should be connected to get posts from Store
          */}
        </div>
      </div>
    );
  }
}

export default Month;
