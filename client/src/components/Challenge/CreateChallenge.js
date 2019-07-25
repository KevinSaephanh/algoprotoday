import React, { Component } from "react";

class CreateChallenge extends Component {
  state = {
    title: "",
    difficulty: "",
    prompt: "",
    solutions: [],
    displayDifficulties: false
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  showDiffultiesMenu = e => {
    e.preventDefault();
    this.setState({ displayDifficulties: true }, () => {
      document.addEventListener("click", this.hideDifficultiesMenu);
    });
  };

  hideDiffultiesMenu = e => {
    e.preventDefault();
    this.setState({ displayDifficulties: false }, () => {
      document.removeEventListener("click", this.hideDifficultiesMenu);
    });
  };

  render() {
    return (
      <div className="create-challenge">
        <h2>Create Your Very Own Challenge</h2>
        <p>
          Challenges are reviewed for the following criteria
          <br /> before being instated as an official challenge:
        </p>
        <ul>
          <li>Validity/complexity of the challenge</li>
          <li>Duplication of an existing challenge</li>
        </ul>
        <form>
          <label>Title:</label>
          <input type="text" name="title" onChange={this.onChange} />
          <label>Difficulty:</label>
          <div
            className="button"
            onClick={this.showDiffultiesMenu}
            placeholder="Weak"
          />
          {this.state.displayDifficulties ? (
            <ul>
              <li name="difficulty" onChange={this.onChange}>
                Easy
              </li>
              <li name="difficulty" onChange={this.onChange}>
                Intermediate
              </li>
              <li name="difficulty" onChange={this.onChange}>
                Hard
              </li>
              <li name="difficulty" onChange={this.onChange}>
                Pro
              </li>
            </ul>
          ) : null}
          <label>Prompt:</label>
          <textarea name="prompt" onChange={this.onChange} />
          <label>Solutions:</label>
          <textarea name="solutions" onChange={this.onChange} />
        </form>
      </div>
    );
  }
}

export default CreateChallenge;
