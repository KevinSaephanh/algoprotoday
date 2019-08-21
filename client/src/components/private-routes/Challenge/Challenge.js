import React, { Component } from "react";
import {
  Row,
  Button,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";
import ChallengeItem from "./ChallengeItem";
import Loader from "../../Loader/Loader";
import { getChallenge } from "../../../store/actions/challengeActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AceEditor from "react-ace";
import "brace/mode/jsx";
import "brace/theme/monokai";
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
    language: "",
    challenge: {},
    dropdown: false
  };

  async componentDidMount() {
    await this.props.getChallenge(this.props.match.params.id);
    const { challenge } = this.props.challenge;
    this.setState({
      challenge: challenge
    });
  }

  toggle = e => {
    this.setState({
      dropdown: !this.state.dropdown
    });
  };

  changeLanguage = e => {
    switch (e.target.value) {
      case "C++":
        this.setState({
          language: "c_cpp"
        });
        return;
      case "C#":
        this.setState({
          language: "C#"
        });
        return;
      default:
        this.setState({
          language: e.target.value
        });
        return;
    }
  };

  compile = e => {
    e.preventDefault();
    console.log("COMPILE");
  };

  render() {
    const { challenge, dropdown, language } = this.state;
    const langChoices = languages.map((lang, i) => {
      return (
        <DropdownItem
          key={i}
          className="dropdown-item"
          onClick={this.changeLanguage}
          value={lang}
        >
          {lang}
        </DropdownItem>
      );
    });

    return (
      <div className="challenge">
        {challenge !== null ? (
          <div>
            <ChallengeItem challenge={challenge} />
            <Row className="challenge-row">
              <Dropdown isOpen={dropdown} toggle={this.toggle}>
                <DropdownToggle className="dropdown-toggle" caret>
                  {language ? language : "javascript"}
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu">
                  {langChoices}
                </DropdownMenu>
              </Dropdown>
              <Button onClick={this.compile}>Compile</Button>
            </Row>
            <AceEditor
              mode={language ? language : "javascript"}
              theme="monokai"
              editorProps={{ $blockScrolling: true }}
              height="400px"
              className="ace-editor"
            />
          </div>
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

Challenge.propTypes = {
  challenge: PropTypes.object.isRequired,
  getChallenge: PropTypes.func.isRequired
};

const mapStatetoProps = state => {
  return {
    challenge: state.challenge
  };
};

export default connect(
  mapStatetoProps,
  { getChallenge }
)(Challenge);
