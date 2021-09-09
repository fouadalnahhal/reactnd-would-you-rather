import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Nav} from 'react-bootstrap';

class PollNav extends Component {
  render() {
    return (
      <Nav className="justify-content-center" activeKey="/home">
        <Nav.Item>
          <NavLink to="/poll/unanswered">Unanswered Questions</NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/poll/answered">Answered Questions</NavLink>
        </Nav.Item>
      </Nav>
    );
  }
}

export default PollNav;
