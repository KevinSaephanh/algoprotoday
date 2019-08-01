import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { register } from "../../store/actions/authActions";
import { Form, Button } from "react-bootstrap";
import "./Auth.css";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
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
    window.location = "/login";
  };

  onSubmit = e => {
    e.preventDefault();
    console.log(JSON.stringify(this.state));
    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };

    this.props.register(newUser, this.props.history);
  };

  render() {
    return (
      <div className="auth">
        <h1>Register</h1>
        <Form onSubmit={this.onSubmit}>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Enter username"
            onChange={this.onChange}
          />
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={this.onChange}
          />
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={this.onChange}
          />
          <Button variant="light" type="submit" name="register">
            Register
          </Button>
          <p>
            Already have an account? Login
            <strong onClick={this.onClick}> here</strong>
          </p>
        </Form>
      </div>
    );
  }
}

Register.propTypes = {
  register: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { register }
)(Register);
