import React, { Component } from "react";
import { connect } from "react-redux";
import ChallengeList from "../../components/Challenge/ChallengeList";

class Profile extends Component {
  componentDidMount() {
    this.setState({
      user: this.props.username
    });
  }

  render() {
    const { challenges } = this.props;

    return (
      <div className="profile-container">
        <h3>Hello {this.state.user}</h3>
        <div className="row">
          <div className="col">
            <ChallengeList challenges={challenges} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    challenges: state.challenge.challenges
  };
};

export default connect(mapStatetoProps)(Profile);
