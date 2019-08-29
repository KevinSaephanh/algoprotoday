import React from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import "./Home.css";

const Home = ({ user }) => {
    if (user.isAuthenticated) {
        const { username } = user.user;
        window.location.href = `/profile/${username}`;
    }

    return (
        <div className="home">
            <h1>Welcome to AlgoProToday</h1>
            <p>
                Start your path to becoming a pro algorithms solver today!
                <br />
                Gain the necessary skills to ace your next coding interview!
            </p>
            <Button
                className=".btn"
                onClick={() => (window.location = "/register")}
            >
                Signup
            </Button>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        user: state.auth
    };
};

export default connect(mapStateToProps)(Home);
