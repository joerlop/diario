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
    this.$el.somePlugin();
    this.props.el.on("click", this.$el, function() {
      $(this).toggleClass("active").next().slideToggle();
    });
  }

  componentWillUnmount() {
    this.$el.somePlugin('destroy');
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
