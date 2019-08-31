import React, { Component } from "react";
import { Row, Card, CardText, CardBody, CardTitle } from "reactstrap";
import { connect } from "react-redux";
import { getUserData } from "../../../store/actions/authActions";
import PropTypes from "prop-types";
import Loader from "../../Loader/Loader";

import "./Profile.css";

class Profile extends Component {
    state = {
        email: "",
        website: "",
        bio: "",
        github: "",
        linkedin: "",
        loading: true
    };

    async componentDidMount() {
        const { user } = this.props;
        if (!user.isAuthenticated) {
            window.location.href = "/login";
        }

        // Fetch user data
        try {
            const userInfo = await getUserData(user.user._id);
            const { email, bio, website, github, linkedin } = userInfo;
            this.setState({
                email,
                bio,
                website,
                github,
                linkedin,
                loading: false
            });
        } catch (err) {
            console.log(err);
        }
    }

    onClick = e => {
        const { username } = this.props.user.user;
        window.location.href = `/profile_edit/${username}`;
    };

    render() {
        const { username } = this.props.user.user;
        const { email, website, github, linkedin, bio } = this.state;

        return (
            <div className="profile">
                {!this.state.loading ? (
                    <div>
                        <h2>Hello {username}!</h2>
                        <Row>
                            <Card>
                                <div className="card-top">
                                    <h3>Profile</h3>
                                    <button onClick={this.onClick}>
                                        Edit Profile
                                    </button>
                                </div>
                                <i className="far fa-user"></i>
                                <CardBody>
                                    <CardTitle>Username: {username}</CardTitle>
                                    <CardText>Contact: {email}</CardText>
                                </CardBody>
                            </Card>
                            <div className="info">
                                <h3>Portfolio</h3>
                                <a href={website}>{website}</a>
                                <h3>Github</h3>
                                <a href={github}>{github}</a>
                                <h3>LinkedIn</h3>
                                <a href={linkedin}>{linkedin}</a>
                                <h3>Bio</h3>
                                <p>{bio}</p>
                            </div>
                        </Row>
                    </div>
                ) : (
                    <Loader />
                )}
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

export default connect(
    mapStatetoProps,
    { getUserData }
)(Profile);
