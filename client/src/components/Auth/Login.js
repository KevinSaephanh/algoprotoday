import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../store/actions/authActions";
import { Form, Button } from "react-bootstrap";
import "./Auth.css";

class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onClick = e => {
    window.location = "/register";
  };

  onSubmit = async e => {
    e.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password
    };
    await this.props.login(user);
  };

  render() {
    //const { errors } = this.state;

    return (
      <div className="auth">
        <h1>Login</h1>
        <Form onSubmit={this.onSubmit}>
          <div className="input-field">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter username"
              onChange={this.onChange}
            />
          </div>
          <div className="input-field">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={this.onChange}
            />
          </div>
          <Button variant="light" type="submit" name="login">
            Login
          </Button>
          <p>
            Don't have an account? Register
            <strong onClick={this.onClick}> here</strong>
          </p>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth,
    errors: state.error
  };
};

export default connect(
  mapStateToProps,
  { login }
)(Login);
