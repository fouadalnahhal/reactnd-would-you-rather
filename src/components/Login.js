import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { withRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Alert, Breadcrumb, Card, Form, Navbar, Nav, NavDropdown, DropdownButton, Dropdown } from 'react-bootstrap';
class Login extends Component {
    state = {
        id: "",
      };
    handleSignIn = (e) => {
        const selectForm = this.state.id;
        const { dispatch } = this.props;
        dispatch(setAuthedUser(selectForm));
    };
    handleDropdownButton = (id) => {
        this.setState({ id: id });
        console.log(id);
    };
    render() {
        return (
            <div>
                {/* <img src={logo} className="App-logo" alt="logo" /> */}
                <Card className="mt-3" style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>Would You Rather</Card.Title>
                        <DropdownButton name="users" id="users" title="User">
                            {this.props.formattedUsers.map((user) => (
                                <Dropdown.Item onClick={() => this.handleDropdownButton(user.id)} key={user.id} value={user.id}>
                                    {user.name}
                                </Dropdown.Item>
                            ))}
                        </DropdownButton>
                        <Button id="sign-in" onClick={this.handleSignIn}>Sign In</Button>
                    </Card.Body>
                </Card >
            </div>
        )
    }
}

Login.propTypes = {
    formattedUsers: PropTypes.array.isRequired,
    authedUser: PropTypes.string.isRequired,
};

function mapStateToProps({ users, authedUser }) {
    const formattedUsers = Object.values(users).map((user) => {
        return { id: user.id, name: user.name, password: user.password };
    });
    return {
        formattedUsers,
        authedUser,
    };
}
export default withRouter(connect(mapStateToProps)(Login));
