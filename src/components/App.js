import React, { Component } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import { Route, Switch, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import LoadingBar from "react-redux-loading";
import NavItem from "./NavItem";
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
      <React.Fragment>
        {this.props.loading ? null : (
          <React.Fragment>
            {/* <div className='container'><Nav /></div> */}
            <NavItem />
            {this.props.loggedOut ? (
              <div className="App" >
                <div className="App-header" >
                  <Login />
                </div>
              </div>

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
                  <div className="App App-header" >
                    <div className="App" >
                      <div className="App-header" >
                        <Poll />
                      </div>
                    </div>
                  </div>
                </Route>
                <Route path="/questions/:questiondID">
                  <div className="App" >
                    <div className="App-header" >
                      <Question />
                    </div>
                  </div>
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