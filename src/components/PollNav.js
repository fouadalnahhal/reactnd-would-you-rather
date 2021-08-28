import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Container, Navbar, Nav} from 'react-bootstrap';

class PollNav extends Component {
  render() {
    return (
      <Nav className="justify-content-center" activeKey="/home">
        <Nav.Item>
          <Nav.Link href="/poll/unanswered">Unanswered Questions</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/poll/answered">Answered Questions</Nav.Link>
        </Nav.Item>
      </Nav>
    );
  }
}

export default PollNav;
