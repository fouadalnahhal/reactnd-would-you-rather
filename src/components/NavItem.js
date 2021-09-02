import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import "../index.css";
import { setAuthedUser } from "../actions/authedUser";
import { Container, Navbar, Nav} from 'react-bootstrap';

class NavItem extends Component {
  handleCLick = () => {
    const { dispatch } = this.props;
    dispatch(setAuthedUser("LOGGED_OUT"));
    this.setState({ dropDown: false });
  };
  render() {
    const { loggedOut, user } = this.props;
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
              <NavLink to="#deets">
                Hello, {loggedOut ? "Please Login" : user.name}
                <img alt="avatar" src={loggedOut ? "/images/avatars/0.png" : `/images/avatars/${user.avatarURL}.png`} /> {!loggedOut && "▾"}
                <div className={loggedOut ? "" : ""}>
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
  loggedOut: PropTypes.bool.isRequired,
};

function mapStateToProps({ authedUser, users }) {
  const user = users[authedUser];
  let loggedOut = false;
  if (authedUser === "LOGGED_OUT") {
    loggedOut = true;
  }
  return {
    user,
    loggedOut,
  };
}

export default connect(mapStateToProps)(NavItem);