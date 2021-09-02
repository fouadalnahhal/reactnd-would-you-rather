import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import { Redirect } from "react-router-dom";
import { Button, Card, Form } from 'react-bootstrap';

class NewQuestion extends Component {
    state = {
        questionOne: "",
        questionTwo: "",
        redirect: false,
    };

    handleChange = (e) => {
        e.preventDefault();
        const element = e.target;
        this.setState({ [element.id]: element.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { dispatch } = this.props;
        const { questionOne, questionTwo } = this.state;
        if (questionOne.trim() === "" || questionTwo.trim() === "") {
            alert("One or more questions are empty, please make sure both fields are filled.");
        } else {
            dispatch(handleAddQuestion(questionOne, questionTwo));
            this.setState({ redirect: true });
        }
    };
    render() {
        if (this.state.redirect) {
            return <Redirect to="/" />;
        }
        return (
            <Form onSubmit={this.handleSubmit} className="mt-3">
                <h1>Create New Question</h1>
                <p>Complete the question</p>
                <h2>Would You Rather</h2>
                <Form.Group className="mb-3" controlId="questionOne">
                    <Form.Control type="text" placeholder="Enter Option One Text Here" onChange={this.handleChange} />
                </Form.Group>
                <h2>OR</h2>
                <Form.Group className="mb-3" controlId="questionTwo">
                    <Form.Control type="text" placeholder="Enter Option Two Text Here" onChange={this.handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        )
    }
}

export default connect()(NewQuestion);