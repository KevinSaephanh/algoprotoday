import React, { Component } from "react";
import { connect } from "react-redux";
import { register } from "../../store/actions/authActions";
import { Form, Label, Input, Button } from "reactstrap";
import "./Auth.css";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: ""
  };

  componentDidMount() {
    const { user } = this.props;
    if (user.isAuthenticated) {
      window.location.href = `/profile/${user.username}`;
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
    window.location.href = "/login";
  };

  render() {
    //const { errors } = this.state;
    return (
      <div className="auth">
        <h1>Register</h1>
        <Form onSubmit={this.onSubmit}>
          <Label>Username</Label>
          <Input
            type="text"
            name="username"
            placeholder="Enter username"
            onChange={this.onChange}
          />
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={this.onChange}
          />
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={this.onChange}
          />
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

const mapStateToProps = state => {
  return {
    user: state.auth
  };
};

export default connect(
  mapStateToProps,
  { register }
)(Register);
