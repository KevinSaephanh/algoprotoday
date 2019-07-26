import React, { Component } from "react";
import { connect } from "react-redux";
import { getChallenges } from "../../store/actions/challengeActions";
import PropTypes from "prop-types";
import "./Challenge.css";

class ChallengeList extends Component {
  state = {
    expandList: false
  };

  componentDidMount() {
    this.props.getChallenges();
  }

  toggle = e => {
    e.preventDefault();
    this.setState({
      expandList: !this.state.expandList
    });
  };

  filterChallenges = (challenges, difficulty) => {
    const filteredChallenges = challenges.filter(
      challenge => challenge.difficulty === difficulty
    );
    return filteredChallenges;
  };

  createList = challenges => {
    const list = challenges.map((challenge, i) => {
      return (
        <li className="challenge-item" key={i}>
          {challenge.title}
        </li>
      );
    });

    return list;
  };

  render() {
    const { challenges } = this.props.challenge;
    // Filter challenges by difficulty
    const easyChals = this.filterChallenges(challenges, "Easy");
    const intermediateChals = this.filterChallenges(challenges, "Intermediate");
    const hardChals = this.filterChallenges(challenges, "Hard");
    const proChals = this.filterChallenges(challenges, "Pro");

    // Create lists for the filtered challenges
    const easyList = this.createList(easyChals);
    const intermediateList = this.createList(intermediateChals);
    const hardList = this.createList(hardChals);
    const proList = this.createList(proChals);

    return (
      <div className="challenge-list">
        <div className="row">
          <div className="col">
            <div className="list-toggler" onClick={this.toggle}>
              Easy Challenges
            </div>
            {this.state.expandList && (
              <ul onClick={e => e.stopPropagation()}>{easyList}</ul>
            )}
          </div>
          <div className="col">
            <div className="list-toggler" onClick={this.toggle}>
              Intermediate Challenges
            </div>
            {this.state.expandList && (
              <ul onClick={e => e.stopPropagation()}>{intermediateList}</ul>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="list-toggler" onClick={this.toggle}>
              Hard Challenges
            </div>
            {this.state.expandList && (
              <ul onClick={e => e.stopPropagation()}>{hardList}</ul>
            )}
          </div>
          <div className="col">
            <div className="list-toggler" onClick={this.toggle}>
              Pro Challenges
            </div>
            {this.state.expandList && (
              <ul onClick={e => e.stopPropagation()}>{proList}</ul>
            )}
          </div>
        </div>
      </div>
    );
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
