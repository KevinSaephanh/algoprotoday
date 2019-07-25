import React, { Component } from "react";
import "./Auth.css";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    console.log(JSON.stringify(this.state));
  };

  render() {
    return (
      <div className="auth">
        <h1>Login</h1>
        <form onSubmit={this.onSubmit}>
          <div className="input-field">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" onChange={this.onChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" onChange={this.onChange} />
          </div>
          <div className="input-field">
            <button name="login">Login</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
