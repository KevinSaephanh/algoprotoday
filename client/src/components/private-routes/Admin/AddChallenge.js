import React, { Component } from "react";
import { connect } from "react-redux";
//import { Link } from "react-router-dom";

class AddChallenge extends Component {
  state = {
    formData: {
      title: "",
      difficulty: "",
      prompt: "",
      solutions: ""
    }
  };

  handleInput = (e, name) => {
    const newFormData = { ...this.state.formData };
    newFormData[name] = e.target.value;

    this.setState({
      formData: newFormData
    });
  };

  /*handleSubmit = e => {
    e.preventDefault();
    this.props.dispatch(
      addChallenge({
        ...this.state.formData,
        ownerID: this.props.login.id
      })
    );
  };*/

  componentWillMount() {
    //this.props.dispatch(clearNewChallenge());
  }

  render() {
    return <div />;
  }
}

const mapStateToProps = state => {
  return {
    challenges: state.challenges
  };
};

export default connect(mapStateToProps)(AddChallenge);
