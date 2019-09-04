import React, { Component } from "react";
import { Form, Label, Input, Button, Alert } from "reactstrap";
import {
    sendAccountDetails,
    updateAuth
} from "../../store/actions/authActions";
import "./Auth.css";

class ResendEmail extends Component {
    state = {
        username: "",
        email: "",
        password: "",
        newPassword: "",
        toggleModes: false,
        message: ""
    };

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    toggle = e => {
        this.setState({
            message: "",
            toggleModes: !this.state.toggleModes
        });
    };

    onSubmit = async e => {
        e.preventDefault();

        // Check if email input is null
        const { email } = this.state;
        if (email.length < 1) {
            this.setState({
                message: "Email is required!"
            });
        }

        // Retrieve account details
        const message = await sendAccountDetails(email);
        this.setState({
            message
        });

        // Toggle modes after 3 seconds
        setTimeout(this.toggle, 3000);
    };

    updateAcc = async e => {
        e.preventDefault();

        const { username, email, password, newPassword } = this.state;
        const user = {
            username,
            email,
            password,
            newPassword
        };

        // Update account
        const message = await updateAuth(user);
        this.setState({
            message
        });
    };

    render() {
        const { message, toggleModes } = this.state;
        return (
            <div className="auth">
                {!toggleModes ? (
                    <div className="account-auth">
                        <h2>Account Retrieval</h2>
                        <p>
                            In order to retrieve and notify you of your account
                            details, we need you to provide the email
                            corresponding to the account
                        </p>
                        <Form onSubmit={this.onSubmit}>
                            <div className="input-field">
                                <Label>Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="Enter email"
                                    onChange={this.onChange}
                                />
                            </div>
                            {message && <Alert>{message}</Alert>}
                            <Button className="btn" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </div>
                ) : (
                    <div className="account-auth">
                        <h2>Account Update</h2>
                        <p>
                            Enter the password sent to your email as well as
                            your new password
                        </p>
                        <Form onSubmit={this.updateAcc}>
                            <div className="input-field">
                                <Label>New Username</Label>
                                <Input
                                    type="text"
                                    name="username"
                                    placeholder="Enter username"
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="input-field">
                                <Label>Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="Enter password"
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="input-field">
                                <Label>New Password</Label>
                                <Input
                                    type="password"
                                    name="newPassword"
                                    placeholder="Enter new password"
                                    onChange={this.onChange}
                                />
                            </div>
                            {message && <Alert>{message}</Alert>}
                            <Button
                                className="btn"
                                type="submit"
                                onSubmit={this.updateAcc}
                            >
                                Submit
                            </Button>
                        </Form>
                    </div>
                )}
            </div>
        );
    }
}

export default ResendEmail;
