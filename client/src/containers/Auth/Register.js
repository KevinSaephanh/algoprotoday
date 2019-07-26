import React, { Component } from "react";
import "./Auth.css";

class Register extends Component {
  state = {
    username: "",
    email: "",
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
        <h1>Register</h1>
        <form onSubmit={this.onSubmit}>
          <div className="input-field">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" onChange={this.onChange} />
          </div>
          <div className="input-field">
            <label htmlFor="email" style={{ paddingRight: "5px" }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={this.onChange}
              style={{ marginLeft: "35px" }}
            />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" onChange={this.onChange} />
          </div>
          <div className="input-field">
            <button name="register">Register</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Register;
