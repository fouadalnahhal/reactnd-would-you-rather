import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import "../index.css";
import { setAuthedUser } from "../actions/authedUser";
import { Container, Navbar, Nav } from 'react-bootstrap';

class NavItem extends Component {
  handleCLick = () => {
    const { dispatch } = this.props;
    dispatch(setAuthedUser("LOGGED_OUT"));
  };
  render() {
    const { user } = this.props;
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Would You Rather</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/add">New Question</NavLink>
              <NavLink to="/leaderboard">Leaderboard</NavLink>
            </Nav>
            <Nav>
              <NavLink to="/">
                Hello, {user === undefined ? "Please Login" : user.name}
                <img alt="avatar" src={user === undefined ? "/images/avatars/0.png" : `/images/avatars/${user.avatarURL}.png`} />
                <div>
                  <p onClick={this.handleCLick}>Logout</p>
                </div>
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }
}
NavItem.propTypes = {
  user: PropTypes.object,
};

function mapStateToProps({ authedUser, users }) {
  return {
    user: users[authedUser],
  };
}

export default connect((mapStateToProps))(NavItem);