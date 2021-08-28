import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter, Redirect } from "react-router-dom";
import { handleAnswerQuestion } from "../actions/questions";
class Question extends Component {
    state = {
        option: "optionOne",
    };
    calculateVotes = (votes, totalVotes) => {
        return Math.round((votes / totalVotes) * 100);
    };
    handleChange = (e) => {
        const element = e.target;
        this.setState({ option: element.value });
    };
    handleSubmit = (e) => {
        e.preventDefault();
        const { dispatch, question } = this.props;
        dispatch(handleAnswerQuestion(question.id, this.state.option));
    };
    render() {
        if (this.props.not_found) {
            return <Redirect to="/not-found" />;
        }
        const { user, answered, authedUser, question } = this.props;
        const { optionOne, optionTwo } = question;
        const totalVotes = optionOne.votes.length + optionTwo.votes.length;
        return (
            <div className="question color-primary">
                <div className="question-header">
                    <Link to={answered ? "/poll/answered" : "/poll/unanswered"}>
                        <img src="/images/arrow-back.svg" alt="back" />
                    </Link>
                    <p>{answered ? "Asked by " + user.name : user.name + " Asks"}</p>
                </div>
                <div className={`item-content${answered ? " answer-content" : ""}`}>
                    <div className="content-image">
                        <img alt="avatar" src={`/images/avatars/${user.avatarURL}.png`} />
                    </div>
                    <div className={`content-seperator${answered ? " answer-seperator" : ""}`}></div>
                    <div className="content-text">
                        <p className="would-you">{answered ? "Would You Rather" : "Results"}</p>
                        {answered ? (
                            <form>
                                <div className={`answer-section${question.optionOne.votes.includes(authedUser) ? " chosen-answer" : ""}`}>
                                    <label>{optionOne.text}</label>
                                    <div className="progress" data-label={`${this.calculateVotes(optionOne.votes.length, totalVotes)}% Complete`}>
                                        <span className="value" style={{ width: this.calculateVotes(optionOne.votes.length, totalVotes) + "%" }}></span>
                                    </div>
                                    <label className="choice-percentage">{`${optionOne.votes.length} Out Of ${totalVotes}`}</label>
                                </div>
                                <div className={`answer-section${question.optionTwo.votes.includes(authedUser) ? " chosen-answer" : ""}`}>
                                    <label>{optionTwo.text}</label>
                                    <div className="progress" data-label={`${this.calculateVotes(optionTwo.votes.length, totalVotes)}% Complete`}>
                                        <span className="value" style={{ width: this.calculateVotes(optionTwo.votes.length, totalVotes) + "%" }}></span>
                                    </div>
                                    <label className="choice-percentage">{`${optionTwo.votes.length} Out Of ${totalVotes}`}</label>
                                </div>
                            </form>
                        ) : (
                            <form onSubmit={this.handleSubmit}>
                                <input type="radio" id="optionOne" name="option" value="optionOne" onChange={this.handleChange} defaultChecked />
                                <label htmlFor="optionOne">{optionOne.text}</label>
                                <input type="radio" id="optionTwo" name="option" value="optionTwo" onChange={this.handleChange} />
                                <label htmlFor="optionTwo">{optionTwo.text}</label>
                                <input type="submit" value="Submit Vote" className="voteBtn" />
                            </form>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

Question.propTypes = {
    question: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    answered: PropTypes.bool.isRequired,
    authedUser: PropTypes.string.isRequired,
};

function mapStateToProps({ questions, users, authedUser }, { match }) {
    const id = match.params.questiondID;
    const question = questions[id];
    let answered = false;
    const not_found = true;
    if (question === undefined) {
        return {
            not_found,
        };
    } else {
        if (question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)) {
            answered = true;
        }
    }
    const user = users[question.author];
    return {
        question,
        user,
        answered,
        authedUser,
    };
}

export default withRouter(connect(mapStateToProps)(Question));
