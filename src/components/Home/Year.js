import React from "react";
import Month from "./Month";
import $ from 'jquery';

class Year extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      open: false
    };
  }

  componentDidMount() {
    this.$el = $(this.el);
    this.props.el.on("click", this.$el, function() {
      $(this).next().slideToggle();
    });
  }

  toggleYearOpen = () => {
    this.setState({
      open: !this.state.open
    });
  };

  render() {
    return (
      <div  ref={el => this.el = el} className={`YearComponent`}>
        <h2 onClick={() => this.toggleYearOpen()}>{this.props.year.year}</h2>
        <div className={`MonthList`}>
          {this.props.year.months.map(month => (
            <Month year={this.props.year.year} month={month} posts={this.props.posts}/>
          ))}
        </div>
      </div>
    );
  }
}

export default Year;
