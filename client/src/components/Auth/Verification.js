import React, { Component } from "react";
import Loader from "../Loader/Loader";
import { verifyEmail } from "../../store/actions/authActions";
import "./Auth.css";

export class Verification extends Component {
    state = {
        verifying: true,
        message: ""
    };

    async componentDidMount() {
        console.log(this.props.match.params.token);
        const message = await verifyEmail(this.props.match.params.token);

        this.setState({
            verifying: false,
            message
        });
    }

    render() {
        const { verifying, message } = this.state;

        return (
            <div className="verification">
                {!verifying ? (
                    <div>{message ? <h1>{message}</h1> : null}</div>
                ) : (
                    <Loader />
                )}
            </div>
        );
    }
}

export default Verification;
