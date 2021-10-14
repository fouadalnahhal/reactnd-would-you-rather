import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import { Redirect } from "react-router-dom";
import { Toast, Button, Card, Form } from 'react-bootstrap';

class NewQuestion extends Component {
    state = {
        validationCustom01: "",
        validationCustom02: "",
        redirect: false,
        validated: false,
    };

    handleChange = (e) => {
        e.preventDefault();
        const element = e.target;
        this.setState({ [element.id]: element.value });
    };

    handleSubmit = (event) => {
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            const { dispatch } = this.props;
            const { validationCustom01, validationCustom02 } = this.state;
            dispatch(handleAddQuestion(validationCustom01, validationCustom02));
            this.setState({ redirect: true });
        }

        this.setState({ validated: true });
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to="/" />;
        }
        return (
            <Card style={{ width: '18rem' }} className="mt-3">
                <Card.Body>
                    <Card.Title>Create New Question</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Complete the question</Card.Subtitle>
                    <Card.Text>Would You Rather</Card.Text>
                    <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                        <Form.Group className="mb-3" controlId="validationCustom01">
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter Option One Text Here"
                                onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="validationCustom02">
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter Option Two Text Here"
                                onChange={this.handleChange} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        )
    }
}

export default connect()(NewQuestion);