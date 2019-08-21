import React, { Component } from "react";
import { connect } from "react-redux";
import { register } from "../../store/actions/authActions";
import { Form, Label, Input, Button, Alert } from "reactstrap";
import PropTypes from "prop-types";
import "./Auth.css";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    errors: {}
  };

  componentDidMount() {
    const { user } = this.props;
    if (user.isAuthenticated) {
      const { username } = user.user;
      window.location.href = `/profile/${username}`;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onClick = e => {
    window.location.href = "/login";
  };

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };

    this.props.register(newUser);
    window.location.href = "/login";
  };

  render() {
    const { errors } = this.state;

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
            <Alert className="input-alert">{errors.username}</Alert>
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
