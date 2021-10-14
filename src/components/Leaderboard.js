import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { withRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Alert, Breadcrumb, Card, Form, Navbar, Nav, NavDropdown, DropdownButton, Dropdown } from 'react-bootstrap';
class Leaderboard extends Component {
    state = {
        id: "",
    };
    handleSignIn = (e) => {
        const id = this.state.id;
        const { dispatch } = this.props;
        dispatch(setAuthedUser(id));
    };
    handleDropdownButton = (id) => {
        this.setState({ id: id });
        console.log(id);
    };
    compare = (firstEl, secondEl) => {
        if (firstEl.answers + firstEl.questions > secondEl.answers + secondEl.questions) {
            return -1;
        }
        if (firstEl.answers + firstEl.questions <= secondEl.answers + secondEl.questions) {
            return 1;
        }
        // a must be equal to b
        return 0;
    }
    render() {
        return (
            <div>
                <Container>
                    <Row xs={1} md={2} className="g-4">
                        {this.props.formattedUsers.sort(this.compare).map((user) => (
                            <React.Fragment key={user.id}>
                                <Col>
                                    <Card>
                                        <Card.Img variant="top" src={`images/avatars/${user.avatarURL}.png`} />
                                        <Card.Body>
                                            <Card.Title>{user.name}</Card.Title>
                                            <Card.Text>
                                                Answered questions: {user.answers}
                                            </Card.Text>
                                            <Card.Text>
                                                Created questions: {user.questions}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card>
                                        <Card.Header>Score</Card.Header>
                                        <Card.Body>
                                            <Card.Text>
                                                {user.answers + user.questions}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card></Col>
                            </React.Fragment>
                        ))}
                    </Row>
                </Container>

            </div>
        )
    }
}

Leaderboard.propTypes = {
    formattedUsers: PropTypes.array.isRequired
};

function mapStateToProps({ users }) {
    const formattedUsers = Object.values(users).map((user) => {
        return { id: user.id, name: user.name, avatarURL: user.avatarURL, questions: user.questions.length, answers: Object.values(user.answers).length };
    });
    return {
        formattedUsers
    };
}
export default withRouter(connect(mapStateToProps)(Leaderboard));
