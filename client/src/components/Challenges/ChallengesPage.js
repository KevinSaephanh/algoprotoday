import React, { Component } from "react";
import { connect } from "react-redux";
import { getChallenges } from "../../store/actions/challengeActions";
import ChallengeTable from "./ChallengeTable";
import "./Challenges.css";

class ChallengesPage extends Component {
  state = {
    challenges: []
  };

  async componentDidMount() {
    if (!this.props.challenges.length) {
      try {
        await this.props.getChallenges();
      } catch (err) {
        console.log(err);
      }
    }
    const { challenges } = this.props;
    this.setState({
      challenges
    });
  }

  filterChallenges = (challenges, difficulty) => {
    const filteredChallenges = challenges.filter(
      challenge => challenge.difficulty === difficulty
    );
    return filteredChallenges;
  };

  onClick = challengeID => {
    // Not working right now
    if (this.props.user.isAuthenticated) {
      window.location = `/challenges/${challengeID}`;
    } else {
      window.location = "/login";
    }
  };

  render() {
    console.log(this.state.challenges);
    return (
      <div className="challenges-page">
        <h2>Select From an Array of Challenges</h2>
        <ChallengeTable
          challenges={this.state.challenges}
          onClick={this.onClick}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth,
    challenges: state.challenge.challenges
  };
};

export default connect(
  mapStateToProps,
  { getChallenges }
)(ChallengesPage);
