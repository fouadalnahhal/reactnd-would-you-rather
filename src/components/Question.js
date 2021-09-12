import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink, withRouter, Redirect } from "react-router-dom";
import { handleAnswerQuestion } from "../actions/questions";
import { Button, Card, Form, ProgressBar } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';

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
            <Card style={{ width: '20rem' }} className="mt-3">
                <Card.Header>
                    <NavLink to={answered ? "/poll/answered" : "/poll/unanswered"}>
                        <ArrowLeft color="royalblue" size={30} className="ml-4"/>
                    </NavLink>
                    {answered ? " Asked by " + user.name : "  " + user.name + " Asks"}</Card.Header>
                <Card.Img variant="top" src={`/images/avatars/${user.avatarURL}.png`} />
                <Card.Body>

                    <p>{answered ? "Results" : "Would You Rather"}</p>
                    {answered ? (
                        <Form>
                            <Card style={{ width: '18rem' }} border={`${question.optionOne.votes.includes(authedUser) ? "success" : ""}`}>
                                <Card.Body>
                                    <Card.Title>{optionOne.text}</Card.Title>
                                    <ProgressBar className="mt-3" now={this.calculateVotes(optionOne.votes.length, totalVotes)} />
                                    <Card.Text className="mt-3">{`${optionOne.votes.length} Out Of ${totalVotes} votes`}</Card.Text>
                                </Card.Body>
                            </Card>
                            <Card style={{ width: '18rem' }} className="mt-3" border={`${question.optionTwo.votes.includes(authedUser) ? "success" : ""}`}>
                                <Card.Body>
                                    <Card.Title>{optionTwo.text}</Card.Title>
                                    <ProgressBar className="mt-3" now={this.calculateVotes(optionTwo.votes.length, totalVotes)} />
                                    <Card.Text className="mt-3"> {`${optionTwo.votes.length} Out Of ${totalVotes} votes`}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Form>
                    ) : (
                        <Form onSubmit={this.handleSubmit}>
                            <div key="inline-radio" className="mb-3">
                                <Form.Check
                                    inline
                                    label={optionOne.text}
                                    name="group1"
                                    type="radio"
                                    id="optionOne"
                                    value="optionOne"
                                    onChange={this.handleChange}
                                    defaultChecked
                                />
                                <Form.Check
                                    inline
                                    label={optionTwo.text}
                                    name="group1"
                                    type="radio"
                                    id="optionTwo"
                                    value="optionTwo"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <Button variant="primary" type="submit">Submit</Button>
                        </Form>
                    )}
                </Card.Body>
            </Card>
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
