import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import "../index.css";
import { setAuthedUser } from "../actions/authedUser";

class Nav extends Component {
  handleCLick = () => {
    const { dispatch } = this.props;
    dispatch(setAuthedUser("LOGGED_OUT"));
    this.setState({ dropDown: false });
  };
  render() {
    const { loggedOut, user } = this.props;
    return (
      <nav className='nav'>
        <ul>
          <li>
            <NavLink to='/' exact activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/add' activeClassName='active'>
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink to='/leaderboard' activeClassName='active'>
              Leaderboard
            </NavLink>
          </li>
          <li id="tab-user">
            Hello, {loggedOut ? "Please Login" : user.name}
            <img alt="avatar" src={loggedOut ? "/images/avatars/0.png" : `/images/avatars/${user.avatarURL}.png`} /> {!loggedOut && "▾"}
            <div className={loggedOut ? "dropdown-hidden" : "dropdown-content"}>
              <p onClick={this.handleCLick}>Logout</p>
            </div>
          </li>
        </ul>
      </nav>
    )
  }

}
Nav.propTypes = {
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

export default connect(mapStateToProps)(Nav);