import React, { Component } from "react";
import { connect } from "react-redux";
import { register } from "../../store/actions/authActions";
import { Form, Label, Input, Button, Alert } from "reactstrap";
import PropTypes from "prop-types";
import { resendEmail } from "../../store/actions/authActions";
import "./Auth.css";

class Register extends Component {
    state = {
        username: "",
        email: "",
        password: "",
        verificationMsg: "",
        errors: {}
    };

    componentDidMount() {
        const { user } = this.props;
        if (user.isAuthenticated) {
            const { username } = user.user;
            window.location.href = `/profile/${username}`;
        }
    }

    // Check if user is already logged in
    componentWillReceiveProps(nextProps) {
        if (nextProps.user.isAuthenticated) {
            const { username } = nextProps.user.user;
            this.props.history.push(`/profile/${username}`);
        }

        if (nextProps.user.errors) {
            this.setState({
                errors: nextProps.user.errors
            });
        }
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onClick = async e => {
        const { email } = this.state;

        // Check if email input is null
        if (email.length < 1) {
            this.setState({
                verificationMsg: "Input your email"
            });
            return;
        }

        const verificationMsg = await resendEmail(email);
        this.setState({
            verificationMsg
        });
    };

    onSubmit = e => {
        e.preventDefault();
        const newUser = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        };

        this.props.register(newUser);

        if (this.state.errors === null) {
            this.setState({
                verificationMsg: `A verification email has been sent to ${this.state.email}`
            });
        }
    };

    render() {
        const { errors, verificationMsg } = this.state;

        return (
            <div className="auth">
                <h1>Register</h1>
                <Form onSubmit={this.onSubmit}>
                    <Label>Username</Label>
                    <Input
                        type="text"
                        error={errors.username}
                        name="username"
                        placeholder="Enter username"
                        onChange={this.onChange}
                    />
                    {errors.username && (
                        <Alert color="info">{errors.username}</Alert>
                    )}
                    <Label>Email</Label>
                    <Input
                        type="email"
                        error={errors.email}
                        name="email"
                        placeholder="Enter email"
                        onChange={this.onChange}
                    />
                    {errors.email && <Alert>{errors.email}</Alert>}
                    <Label>Password</Label>
                    <Input
                        type="password"
                        error={errors.password}
                        name="password"
                        placeholder="Enter password"
                        onChange={this.onChange}
                    />
                    {errors.password && <Alert>{errors.password}</Alert>}
                    <Button className="btn" type="submit" name="register">
                        Register
                    </Button>
                    <p>
                        Need another verification email? Enter your email and
                        click <strong onClick={this.onClick}>here</strong>
                    </p>
                    {verificationMsg && <Alert>{verificationMsg}</Alert>}
                </Form>
            </div>
        );
    }
}

Register.propTypes = {
    register: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        user: state.auth
    };
};

export default connect(
    mapStateToProps,
    { register }
)(Register);
