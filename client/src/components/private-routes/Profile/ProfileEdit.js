import React, { Component } from "react";
import { Form, Label, Input, Button } from "reactstrap";
import { connect } from "react-redux";
import { updateUser, getUserData } from "../../../store/actions/authActions";
import PropTypes from "prop-types";
import Loader from "../../Loader/Loader";

import "./Profile.css";

class ProfileEdit extends Component {
    state = {
        username: "",
        email: "",
        website: "",
        github: "",
        linkedin: "",
        bio: "",
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
            console.log(userInfo);
            const {
                username,
                email,
                bio,
                website,
                github,
                linkedin
            } = userInfo;
            this.setState({
                username,
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

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = async e => {
        e.preventDefault();
        try {
            const {
                username,
                email,
                website,
                github,
                linkedin,
                bio
            } = this.state;
            const user = {
                username,
                email,
                website,
                github,
                linkedin,
                bio,
                id: this.props.user.user._id
            };
            await updateUser(user);
            //window.location.href = `/profile/${username}`;
        } catch (err) {
            console.log(err);
        }
    };

    render() {
        const {
            username,
            email,
            website,
            github,
            linkedin,
            bio,
            loading
        } = this.state;

        return (
            <div className="profile-edit">
                {!loading ? (
                    <div>
                        <h2>Tell the World About Yourself</h2>
                        <Form onSubmit={this.onSubmit}>
                            <Label>Username</Label>
                            <Input
                                type="text"
                                name="username"
                                onChange={this.onChange}
                                placeholder={username}
                            />
                            <Label>Email</Label>
                            <Input
                                type="text"
                                name="email"
                                onChange={this.onChange}
                                placeholder={email}
                            />
                            <Label>Website</Label>
                            <Input
                                type="text"
                                name="website"
                                onChange={this.onChange}
                                placeholder={website}
                            />
                            <Label>Github</Label>
                            <Input
                                type="text"
                                name="github"
                                onChange={this.onChange}
                                placeholder={github}
                            />
                            <Label>LinkedIn</Label>
                            <Input
                                type="text"
                                name="linkedin"
                                onChange={this.onChange}
                                placeholder={linkedin}
                            />
                            <Label>Bio</Label>
                            <Input
                                type="textarea"
                                name="bio"
                                onChange={this.onChange}
                                placeholder={bio}
                            />
                            <Button type="submit" onSubmit={this.onSubmit}>
                                Update
                            </Button>
                        </Form>
                    </div>
                ) : (
                    <Loader />
                )}
            </div>
        );
    }
}

ProfileEdit.propTypes = {
    user: PropTypes.object.isRequired,
    getUserData: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        user: state.auth
    };
};

export default connect(
    mapStateToProps,
    { getUserData, updateUser }
)(ProfileEdit);
