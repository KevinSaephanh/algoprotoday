import React from "react";

const ChallengeItem = ({ challenge }) => {
    // Add solutions
    const { title, difficulty, prompt } = challenge;
    const difficultyColor = () => {
        switch (difficulty) {
            case "Easy":
                return "green";
            case "Intermediate":
                return "blue";
            case "Hard":
                return "red";
            default:
                return "black";
        }
    };

    return (
        <div className="challenge-item">
            <h2>{title}</h2>
            <h3 style={{ color: difficultyColor() }}>{difficulty}</h3>
            <p>{prompt}</p>
        </div>
    );
};

export default ChallengeItem;
