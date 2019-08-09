import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../store/actions/authActions";
import { Form, Label, Input, Button } from "reactstrap";
import "./Auth.css";

class Login extends Component {
  state = {
    username: "",
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
    window.location.href = "/register";
  };

  onSubmit = async e => {
    e.preventDefault();
    const userData = {
      username: this.state.username,
      password: this.state.password
    };
    await this.props.login(userData);

    const { user } = this.props;
    window.location.href = `/profile/${user.user.username}`;
  };

  render() {
    const { error } = this.props;

    return (
      <div className="auth">
        <h1>Login</h1>
        <Form onSubmit={this.onSubmit}>
          <div className="input-field">
            <Label>Username</Label>
            <Input
              type="text"
              name="username"
              placeholder="Enter username"
              onChange={this.onChange}
            />
            {error && <span style={{ color: "white" }}>{error}</span>}
          </div>
          <div className="input-field">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={this.onChange}
            />
            {error && <span style={{ color: "white" }}>{error}</span>}
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

const mapStateToProps = state => {
  return {
    user: state.auth,
    error: state.auth.error
  };
};

export default connect(
  mapStateToProps,
  { login }
)(Login);
