import React, { Component } from "react";
import { Form, Label, Input, Button, Alert } from "reactstrap";
import "./Auth.css";

class ResendEmail extends Component {
    state = {
        username: "",
        password: "",
        error: ""
    };

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = e => {
        e.preventDefault();
        
    };

    render() {
        const { errors } = this.state;
        return (
            <div className="auth">
                <h1>Login</h1>
                <Form onSubmit={this.onSubmit}>
                    <div className="input-field">
                        <Label>Username</Label>
                        <Input
                            type="text"
                            error={errors.username}
                            name="username"
                            placeholder="Enter username"
                            onChange={this.onChange}
                        />{" "}
                        {errors.username && <Alert>{errors.username}</Alert>}
                    </div>
                    <div className="input-field">
                        <Label>Password</Label>
                        <Input
                            type="password"
                            error={errors.password}
                            name="password"
                            placeholder="Enter password"
                            onChange={this.onChange}
                        />
                        {errors.password && <Alert>{errors.password}</Alert>}
                    </div>
                    <Button className="btn" type="submit">
                        Send
                    </Button>
                </Form>
            </div>
        );
    }
}

export default ResendEmail;
