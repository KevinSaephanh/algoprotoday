import React, { Component } from "react";
import { connect } from "react-redux";
import { register } from "../../store/actions/authActions";
import { Form, Button } from "react-bootstrap";
import "./Auth.css";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: ""
  };

  componentDidMount() {
    const { user } = this.props;
    const username = JSON.parse(localStorage.getItem("user"));
    if (user.isAuthenticated) {
      this.props.history.push(`/profile/${username.username}`);
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

  onSubmit = async e => {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };

    await this.props.register(newUser);
    this.props.history.push("/login");
  };

  render() {
    //const { errors } = this.state;
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

const mapStateToProps = state => {
  return {
    user: state.auth
  };
};

export default connect(
  mapStateToProps,
  { register }
)(Register);
