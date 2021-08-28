import React, { Component } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import { Route, Switch, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import LoadingBar from "react-redux-loading";
import Nav from "./Nav";
import Poll from "./Poll";
import Question from "./Question";
import Leaderboard from "./Leaderboard";
import NewQuestion from "./NewQuestion";
import NotFound from "./NotFound";
import Login from "./Login";
// import Footer from "./Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Alert, Breadcrumb, Card, Form, Navbar, NavDropdown, DropdownButton, Dropdown } from 'react-bootstrap';


class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <React.Fragment>
            {this.props.loading ? null : (
              <React.Fragment>
                {/* <div className='container'><Nav /></div> */}
                <Nav />
                {this.props.loggedOut ? (
                  <Login />
                ) : (
                  <Switch>
                    {/* My first thought was to force the user to navigate to the login page if they are logged out then take them back to the page
                    they were in once they finished logging in but it wasn't reliable so instead I will do a conditional rendering of the login page */}
                    <Route path="/login">
                      <Login />
                    </Route>
                    {/* {this.props.loggedOut && <Redirect to="/login" />} */}
                    <Route exact path="/">
                      <Redirect to="poll" />
                    </Route>
                    <Route path="/poll">
                      <Poll />
                    </Route>
                    <Route path="/questions/:questiondID">
                      <Question />
                    </Route>
                    {/* <Route path="/leaderboard">
                      <Leaderboard />
                    </Route>
                    <Route path="/add">
                      <NewQuestion />
                    </Route> */}
                    {/* <Route path="/not-found">
                      <NotFound />
                    </Route> */}
                  </Switch>
                )}
                {/* <Footer /> */}
              </React.Fragment>
            )}
          </React.Fragment>
        </header>
      </div >


    )
  }
}

App.propTypes = {
  loading: PropTypes.bool.isRequired,
  loggedOut: PropTypes.bool.isRequired,
};

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null,
    loggedOut: authedUser === "LOGGED_OUT",
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleInitialData: () => dispatch(handleInitialData()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);