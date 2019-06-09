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
        <h2 onClick={() => this.toggleYearOpen()}>{this.props.year.year}</h2>
        <div className={`MonthList-${this.state.open}`}>
          {this.props.year.months.map(month => (
            <Month year={this.props.year.year} month={month} posts={this.props.posts}/>
          ))}
        </div>
      </div>
    );
  }
}

export default Year;
