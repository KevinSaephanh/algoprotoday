import React, { Component } from "react";
import { connect } from "react-redux";
import Loader from "../Loader/Loader";
import {
  getChallenges,
  getChallenge
} from "../../store/actions/challengeActions";
import ChallengeTable from "./ChallengeTable";
import PropTypes from "prop-types";
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

  onClick = async challengeID => {
    // Not working right now
    if (this.props.user.isAuthenticated) {
      await this.props.getChallenge(challengeID);
      window.location.href = `/challenges/${challengeID}`;
    } else {
      window.location.href = "/login";
    }
  };

  render() {
    const { challenges } = this.state;
    return challenges.length ? (
      <div className="challenges-page">
        <h2>Select From an Array of Challenges</h2>
        <ChallengeTable challenges={challenges} onClick={this.onClick} />
      </div>
    ) : (
      <Loader />
    );
  }
}

ChallengesPage.propTypes = {
  getChallenges: PropTypes.func.isRequired,
  getChallenge: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  challenges: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.auth,
    challenges: state.challenge.challenges
  };
};

export default connect(
  mapStateToProps,
  { getChallenges, getChallenge }
)(ChallengesPage);
