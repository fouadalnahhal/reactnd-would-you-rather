import React from "react";
import { Route } from "react-router";
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