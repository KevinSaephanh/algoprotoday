import React, { Component } from "react";
import { connect } from "react-redux";
import "./Profile.css";

class Profile extends Component {
  render() {
    return (
      <div className="profile">
        <h2>Hello!</h2>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    username: state.auth
  };
};

export default connect(mapStatetoProps)(Profile);
