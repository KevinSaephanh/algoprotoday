import React from "react";
import { Col } from "react-bootstrap";
import "./Challenges.css";

const ChallengeList = props => {
  const challenges = props.challenges;
  return (
    <div className="challenge-list">
      <Col>
        {challenges &&
          challenges.map((challenge, i) => {
            return (
              <li
                className="challenge-item"
                key={i}
                onClick={() => props.onClick(challenge.id)}
              >
                {challenge.title}
              </li>
            );
          })}
      </Col>
    </div>
  );
};

export default ChallengeList;
