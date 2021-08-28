import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class PollNav extends Component {
  render() {
    return (
      <div className="">
        <NavLink to="unanswered">
          <p>Unanswered Questions</p>
        </NavLink>
        <NavLink to="answered">
          <p>Answered Questions</p>
        </NavLink>
      </div>
    );
  }
}

export default PollNav;
