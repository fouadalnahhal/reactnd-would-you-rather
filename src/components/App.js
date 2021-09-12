import React, { Component } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import LoadingBar from "react-redux-loading";
import NavItem from "./NavItem";
import Poll from "./Poll";
import Question from "./Question";
import Leaderboard from "./Leaderboard";
import NewQuestion from "./NewQuestion";
import NotFound from "./NotFound";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';



class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    return (
      <React.Fragment>
        {this.props.loading ? null : (
          <React.Fragment>
            <Container>
              <NavItem />
              <Row className="justify-content-md-center">
                <Col md="auto">
                  <Switch>
                    <Route exact path="/login"
                      component={Login}
                    />
                    <Route exact path="/">
                      <Redirect to="poll" />
                    </Route>
                    <ProtectedRoute loggedOut={this.props.loggedOut} path="/poll" component={Poll} />
                    <ProtectedRoute loggedOut={this.props.loggedOut} path="/questions/:questiondID" component={Question} />
                    <ProtectedRoute loggedOut={this.props.loggedOut} path="/add" component={NewQuestion} />
                    <ProtectedRoute loggedOut={this.props.loggedOut} path="/leaderboard" component={Leaderboard} />
                  </Switch>
                </Col>
              </Row>
            </Container >
          </React.Fragment>
        )
        }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));