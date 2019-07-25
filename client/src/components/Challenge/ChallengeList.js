import React, { Component } from "react";
import { connect } from "react-redux";
import { getChallenges } from "../../store/actions/challengeActions";
import PropTypes from "prop-types";
import "./Challenge.css";

// Filter method
// const easyChallenges = challenges.filter(c => c.difficulty === "Easy");
// const intermediateChallenges = challenges.filter(c => c.difficulty === "Intermediate");
// const hardChallenges = challenges.filter(c => c.difficulty === "Hard");
// const proChallenges = challenges.filter(c => c.difficulty === "Pro");

class ChallengeList extends Component {
  componentDidMount() {
    this.props.getChallenges();
  }

  // Placeholders are rendered for now
  render() {
    const { challenges } = this.props.challenge;
    const showChallenges = challenges.map((challenge, i) => {
      return (
        <div key={i} style={{ color: "white" }}>
          {challenge.title}
        </div>
      );
    });
    return <div>{showChallenges}</div>;
  }
}

ChallengeList.protoTypes = {
  getChallenges: PropTypes.func.isRequired,
  challenge: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    challenge: state.challenge
  };
};

export default connect(
  mapStateToProps,
  { getChallenges }
)(ChallengeList);
