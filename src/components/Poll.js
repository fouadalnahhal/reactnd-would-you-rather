import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import PollNav from "./PollNav";
import QuestionsList from "./QuestionsList";

class Poll extends Component {
    render() {
        return (
            <React.Fragment>
                {this.props.authedUser !== null ? (
                    <div className="poll">
                        <PollNav />
                        <Switch>
                            <Route exact path="/poll">
                                <Redirect to="poll/unanswered" />
                            </Route>
                            <Route path="/poll/answered">
                                <QuestionsList questions={this.props.answeredQuestions} />
                            </Route>
                            <Route path="/poll/unanswered">
                                <QuestionsList questions={this.props.unAnsweredQuestions} />
                            </Route>
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

function mapStateToProps({ authedUser, users, questions }) {
    //Extract all the users answers object keys not values as they are held in this format {QuestionID: Option}
    const userAnswers = Object.keys(users[authedUser].answers);

    //Extract all the values from the questions object as they are held in this format {QuestionID: Question}
    const answeredQuestions = Object.values(questions)
        .filter((question) => userAnswers.includes(question.id)) //Verify if the questionID exists in the userAnswers
        .map((question) => Object.assign({}, question, { type: "answered" })) //Attach the type to the object
        .sort((a, b) => b.timestamp - a.timestamp); //Sort by newest to oldest

    const unAnsweredQuestions = Object.values(questions)
        .filter((question) => !userAnswers.includes(question.id))
        .map((question) => Object.assign({}, question, { type: "unanswered" }))
        .sort((a, b) => b.timestamp - a.timestamp);
    return {
        answeredQuestions,
        unAnsweredQuestions,
    };
}

export default connect(mapStateToProps)(Poll);
