import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./Profile.css";

class Profile extends Component {
    componentDidMount() {
        const { user } = this.props;
        if (!user.isAuthenticated) {
            window.location.href = "/login";
        }
    }

    render() {
        const { username } = this.props.user.user;
        return (
            <div className="profile">
                <h2>Hello {username}!</h2>
            </div>
        );
    }
}

Profile.propTypes = {
    user: PropTypes.object.isRequired
};

const mapStatetoProps = state => {
    return {
        user: state.auth
    };
};

export default connect(mapStatetoProps)(Profile);
