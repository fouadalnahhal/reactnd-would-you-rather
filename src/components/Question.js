import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink, withRouter, Redirect, Link } from "react-router-dom";
import { handleAnswerQuestion } from "../actions/questions";
import { Button, Card, Form, ProgressBar } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';

class Question extends Component {
    state = {
        value: 'optionOne'
    };
    handleChange = (e) => this.setState({ value: e.currentTarget.defaultValue });
    handleSubmit = (e) => {
        e.preventDefault();
        const { dispatch, question } = this.props;
        dispatch(handleAnswerQuestion(question.id, this.state.value));
    };
    render() {
        if (this.props.question === undefined) {
            return (
                <div>
                    <h1>404 - Not Found!</h1>
                    <Link to="/">
                        Go Home
                    </Link>
                </div>);
        }
        const { user, authedUser, question } = this.props;
        const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length;
        return (
            <Card key={this.props.key} style={{ width: '20rem' }} className="mt-3">
                <Card.Header>
                    <NavLink to={(question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)) ? "/poll/answered" : "/poll/unanswered"}>
                        <ArrowLeft color="royalblue" size={30} className="ml-4" />
                    </NavLink>
                    {(question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)) ? " Asked by " + user.name : "  " + user.name + " Asks"}</Card.Header>
                <Card.Img variant="top" src={`/images/avatars/${user.avatarURL}.png`} />
                <Card.Body>
                    <p>{(question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)) ? "Results" : "Would You Rather"}</p>
                    {(question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)) ? (
                        <Form>
                            <Card style={{ width: '18rem' }} border={`${question.optionOne.votes.includes(authedUser) ? "success" : ""}`}>
                                <Card.Body>
                                    <Card.Title>{question.optionOne.text}</Card.Title>
                                    <ProgressBar className="mt-3" now={Math.round((question.optionOne.votes.length / totalVotes) * 100)} />
                                    <Card.Text className="mt-3">{`${question.optionOne.votes.length} Out Of ${totalVotes} votes`}</Card.Text>
                                </Card.Body>
                            </Card>
                            <Card style={{ width: '18rem' }} className="mt-3" border={`${question.optionTwo.votes.includes(authedUser) ? "success" : ""}`}>
                                <Card.Body>
                                    <Card.Title>{question.optionTwo.text}</Card.Title>
                                    <ProgressBar className="mt-3" now={Math.round((question.optionOne.votes.length / totalVotes) * 100)} />
                                    <Card.Text className="mt-3"> {`${question.optionTwo.votes.length} Out Of ${totalVotes} votes`}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Form>
                    ) : (
                        <Form onSubmit={this.handleSubmit}>
                            <div key="inline-radio" className="mb-3">
                                <Form.Check inline label={question.optionOne.text} name="group1" type="radio" id="optionOne" value="optionOne" onChange={this.handleChange} defaultChecked />
                                <Form.Check inline label={question.optionTwo.text} name="group1" type="radio" id="optionTwo" value="optionTwo" onChange={this.handleChange} />
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
    authedUser: PropTypes.string.isRequired,
};

function mapStateToProps({ questions, users, authedUser }, { match }) {
    const id = match.params.questiondID;
    const question = questions[id];
    if (question !== undefined) {
        const user = users[question.author];
        return {
            question,
            user,
            authedUser,
        };
    }
}
export default withRouter(connect(mapStateToProps)(Question));
