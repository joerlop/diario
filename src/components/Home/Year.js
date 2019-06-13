import React from "react";
import Month from "./Month";

class Year extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      open: false
    };
  }

  toggleYearOpen = () => {
    this.setState({
      open: !this.state.open
    });
  };

  render() {
    return (
      <div className={`YearComponent`}>
        {this.props.postYears.length == 0 ? (
          <h2>You have no posts yet!</h2>
        ) : (
          <h2>Your posts:</h2>
        )}
        <h2 onClick={() => this.toggleYearOpen()}>{this.props.year.year}</h2>
        <div className={`MonthList-${this.state.open}`}>
          {this.props.year.months.map(month => (
            <Month
              year={this.props.year.year}
              month={month}
              posts={this.props.posts}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Year;
