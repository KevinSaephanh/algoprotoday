import React, { Component } from "react";
import { Row } from "react-bootstrap";
import { connect } from "react-redux";
import { getChallenges } from "../../store/actions/challengeActions";
import ChallengeList from "./ChallengeList";
import "./Challenges.css";

class ChallengesPage extends Component {
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
    const { challenges } = this.props;
    const easyChals = this.filterChallenges(challenges, "Easy");
    const intermediateChals = this.filterChallenges(challenges, "Intermediate");
    const hardChals = this.filterChallenges(challenges, "Hard");
    const proChals = this.filterChallenges(challenges, "Pro");
    const list = [easyChals, intermediateChals, hardChals, proChals];

    return (
      <div className="challenges-page">
        <h2>Select From an Array of Challenges</h2>
        <Row>
          {list.map((item, i) => {
            return (
              <ChallengeList challenges={item} key={i} onClick={this.onClick} />
            );
          })}
        </Row>
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
