import React, { Component } from "react";
import {
    Row,
    Col,
    Button,
    ButtonGroup,
    Dropdown,
    DropdownItem,
    DropdownToggle,
    DropdownMenu
} from "reactstrap";
import ChallengeItem from "./ChallengeItem";
import Loader from "../../Loader/Loader";
import { getChallenge, compile } from "../../../store/actions/challengeActions";
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
        language: "javascript",
        challenge: {},
        result: {},
        loading: true,
        dropdown: false
    };

    async componentDidMount() {
        await this.props.getChallenge(this.props.match.params.id);
        const { challenge } = this.props.challenge;
        this.setState({
            challenge: challenge,
            loading: false
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
                    language: "csharp"
                });
                return;
            default:
                this.setState({
                    language: e.target.value
                });
                return;
        }
    };

    compile = async e => {
        e.preventDefault();
        let language;
        switch (this.state.language) {
            case "python":
                language = "python3";
                break;
            case "javascript":
                language = "nodejs";
                break;
            default:
                break;
        }
        const challenge = {
            id: this.props.match.params.id,
            language: language,
            script: this.refs.aceEditor.editor.getValue()
        };

        const result = await compile(challenge);
        this.setState({
            result
        });
        console.log(this.state.result);
    };

    render() {
        const { challenge, dropdown, language, loading, result } = this.state;
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
                {!loading ? (
                    <div>
                        <ChallengeItem challenge={challenge} />
                        <Row className="challenge-row">
                            <ButtonGroup className="button-group">
                                <Dropdown
                                    isOpen={dropdown}
                                    toggle={this.toggle}
                                >
                                    <DropdownToggle
                                        className="dropdown-toggle"
                                        caret
                                    >
                                        {language ? language : "javascript"}
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-menu">
                                        {langChoices}
                                    </DropdownMenu>
                                </Dropdown>
                                <Button onClick={this.compile}>Compile</Button>
                            </ButtonGroup>
                        </Row>
                        <Row>
                            <Col>
                                <AceEditor
                                    mode={language ? language : "javascript"}
                                    theme="monokai"
                                    editorProps={{ $blockScrolling: true }}
                                    height="400px"
                                    className="ace-editor"
                                    ref="aceEditor"
                                />
                            </Col>
                            <Col>
                                <div className="result">
                                    <ul>
                                        <li>
                                            CPU Time:{" "}
                                            <span>{result.cpuTime}</span>
                                        </li>
                                        <li>
                                            Memory: <span>{result.memory}</span>
                                        </li>
                                        <li>
                                            Output: <span>{result.output}</span>
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                        </Row>
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
