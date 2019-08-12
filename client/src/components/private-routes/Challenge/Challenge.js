import React, { Component } from "react";
import AceEditor from "react-ace";
import "brace/mode/jsx";
import "brace/theme/github";
import "./Challenge.css";

const languages = ["javascript", "java", "python", "C++", "C#"];

languages.forEach(language => {
  switch (language) {
    case "C++":
      require(`brace/mode/c_cpp`);
      require(`brace/snippets/c_cpp`);
      break;
    case "C#":
      require(`brace/mode/csharp`);
      require(`brace/snippets/csharp`);
      break;
    default:
      require(`brace/mode/${language}`);
      require(`brace/snippets/${language}`);
      break;
  }
});

class Challenge extends Component {
  state = {
    mode: "",
    value: "",
    dropdownOpen: false
  };

  componentDidMount() {
    // These are placeholders
    this.setState({
      title: "Two Sum",
      difficulty: "Easy",
      description:
        "Given an array of integers, return indices of the two numbers such that they add up to a specific target",
      example: ""
    });
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  toggleDropdown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    const difficultyColor = () => {
      const difficulty = this.state.difficulty;

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

    const langChoices = languages.map(lang => {
      return <li>{lang}</li>;
    });

    return (
      <div className="challenge">
        <div className="problem">
          <h2>{this.state.title}</h2>
          <h3 style={{ color: difficultyColor() }}>{this.state.difficulty}</h3>
          <p>{this.state.description}</p>
        </div>
        <div className="code">
          <ul>{langChoices}</ul>
          <AceEditor
            mode="javascript"
            theme="chaos"
            editorProps={{ $blockScrolling: true }}
            height="500px"
            className="aceEditor"
          />
        </div>
      </div>
    );
  }
}

export default Challenge;
