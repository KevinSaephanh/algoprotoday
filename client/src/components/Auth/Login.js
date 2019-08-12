import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../store/actions/authActions";
import { Form, Label, Input, Button, Alert } from "reactstrap";
import PropTypes from "prop-types";
import "./Auth.css";

class Login extends Component {
  state = {
    username: "",
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
    if (nextProps.user.isAuthenticated) {
      const { username } = nextProps.user.user;
      this.props.history.push(`/profile/${username}`);
    }

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
    window.location.href = "/register";
  };

  onSubmit = e => {
    e.preventDefault();
    const userData = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.login(userData);
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
          <Button className="btn" type="submit" name="login">
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
  user: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.auth,
    error: state.error
  };
};

export default connect(
  mapStateToProps,
  { login }
)(Login);
/** {error.message && (
              <span style={{ color: "white" }}>{error.message}</span>
            )} */
