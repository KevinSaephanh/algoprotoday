import React, { Component } from "react";
import { connect } from "react-redux";
import "./Profile.css";

class Profile extends Component {
  componentDidMount() {
    const { user } = this.props;
    if (!user.isAuthenticated) {
      window.location.href = "/";
    }
  }

  render() {
    const { username } = this.props.user;
    return (
      <div className="profile">
        <h2>Hello {username}!</h2>
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
