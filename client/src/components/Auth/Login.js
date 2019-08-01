import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../store/actions/authActions";
import { Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import "./Auth.css";

class Login extends Component {
  state = {
    username: "",
    password: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/profile");
    } else if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/profile");
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onClick = e => {
    window.location = "/register";
  };

  onSubmit = e => {
    e.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.login(user);
  };

  render() {
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

Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    error: state.error
  };
};

export default connect(
  mapStateToProps,
  { login }
)(Login);
