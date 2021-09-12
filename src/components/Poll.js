import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import PollNav from "./PollNav";
import QuestionsList from "./QuestionsList";
import ProtectedRoute from "./ProtectedRoute";

class Poll extends Component {
    render() {
        return (
            <React.Fragment>
                {this.props.authedUser !== null ? (
                    <div>
                        <PollNav />
                        <Switch>
                            <Route exact path="/poll">
                                <Redirect to="/poll/unanswered" />
                            </Route>
                            <ProtectedRoute
                                path="/poll/answered"
                                component={QuestionsList}
                                questions={this.props.answeredQuestions}
                            />
                            <ProtectedRoute
                                path="/poll/unanswered"
                                component={QuestionsList}
                                questions={this.props.unAnsweredQuestions}
                            />
                        </Switch>
                    </div>
                ) : (
                    <div>Loading</div>
                )}
            </React.Fragment>
        );
    }
}

Poll.propTypes = {
    answeredQuestions: PropTypes.array.isRequired,
    unAnsweredQuestions: PropTypes.array.isRequired,
};

function compareNumbers(a, b) {
    return b.timestamp - a.timestamp;
}

function mapStateToProps({ authedUser, questions }) {
    const answeredQuestions = Object.values(questions).filter(
        (question) => (question.optionOne.votes.length > 0 && question.optionOne.votes.includes(authedUser)) ||
            (question.optionTwo.votes.length > 0 && question.optionTwo.votes.includes(authedUser))
    ).map((question) => Object.assign({}, question, { type: "answered" }))
        .sort(compareNumbers);

    const unAnsweredQuestions = Object.values(questions).filter(
        (question) => ((question.optionOne.votes.length === 0 && question.optionTwo.votes.length === 0) ||
            (question.optionOne.votes.length === 0 && !question.optionTwo.votes.includes(authedUser)) ||
            (question.optionTwo.votes.length === 0 && !question.optionOne.votes.includes(authedUser))
        )
    ).map((question) => Object.assign({}, question, { type: "unanswered" }))
        .sort(compareNumbers);

    return {
        answeredQuestions,
        unAnsweredQuestions,
    };
}

export default withRouter(connect(mapStateToProps)(Poll));
