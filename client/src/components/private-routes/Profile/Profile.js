import React, { Component } from "react";
import { connect } from "react-redux";
import "./Profile.css";

class Profile extends Component {
  componentDidMount() {
    
  }

  render() {
    const { username } = this.props.user.user;
    console.log(username);
    return (
      <div className="profile">
        <h2>Hello</h2>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    user: state.auth
  };
};

export default connect(mapStatetoProps)(Profile);
