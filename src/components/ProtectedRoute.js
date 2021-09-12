import React from "react";
import { Route, Redirect, withRouter } from "react-router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Login from "./Login";

const ProtectedRoute = ({ component: Component, exact, path, loggedOut, questions }) => (
    <Route
        exact={exact}
        path={path}
        render={(props) => (loggedOut ? <Login /> : <Component {...props} questions={questions} />
        )}
    />
)

export default ProtectedRoute