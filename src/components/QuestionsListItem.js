import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Container, Row, Col, Button, Alert, Breadcrumb, Card, Form, Navbar, Nav, NavDropdown, DropdownButton, Dropdown } from 'react-bootstrap';

class QuestionsListItem extends Component {
    render() {
        const { user } = this.props;
        const { id, optionOne, type } = this.props.question;
        return (

            <div className="question">
                <Card className="mt-3" style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>Would You Rather</Card.Title>
                        <label>{optionOne.text}</label>
                        <NavLink to={`/questions/${id}`}>
                            <Button >{type === "unanswered" ? "View And Vote" : "View Answer"}</Button>
                        </NavLink>
                    </Card.Body>
                </Card >
                {/* <div className="question-header">
                    <p>{user.name} Asks</p>
                </div> */}
                {/* <div className="item-content poll-content">
                    <div className="content-image">
                        <img alt="avatar" src={`/images/avatars/${user.avatarURL}.png`} />
                    </div>
                    <div className="content-seperator" />
                    <div className="content-text">
                        <p className="would-you">Would You Rather</p>
                        <label>{optionOne.text}</label>

                        <NavLink to={`/questions/${id}`}>
                            <Button className="voteBtn">{type === "unanswered" ? "View And Vote" : "View Answer"}</Button>
                        </NavLink>
                    </div>
                </div> */}
            </div>
        );
    }
}

QuestionsListItem.propTypes = {
    user: PropTypes.object.isRequired,
    question: PropTypes.object.isRequired,
};

function mapStateToProps({ users }, { question }) {
    const user = users[question.author];
    return {
        user,
    };
}

export default connect(mapStateToProps)(QuestionsListItem);
