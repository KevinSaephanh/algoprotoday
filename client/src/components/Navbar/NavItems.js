import React from "react";
import { connect } from "react-redux";
import { logout } from "../../store/actions/authActions";
import { Nav, NavItem, NavLink } from "reactstrap";
import PropTypes from "prop-types";

const NavItems = ({ user, logout }) => {
    const SignOut = e => {
        e.preventDefault();
        logout();
        window.location.href = "/";
    };

    const profileURL = () => {
        if (localStorage.jwtToken) {
            const { username } = user.user;
            return `${username}`;
        } else {
            return "/";
        }
    };

    const items = [
        {
            text: "Mock",
            link: "/mock-interview",
            restricted: true
        },
        {
            text: "Challenges",
            link: "/challenges",
            restricted: false
        },
        {
            text: "Profile",
            link: `/profile/${profileURL()}`,
            restricted: true
        },
        {
            text: "Register",
            link: "/register",
            restricted: false,
            exclude: true
        },
        {
            text: "Login",
            link: "/login",
            restricted: false,
            exclude: true
        },
        {
            text: "Logout",
            link: "/",
            onClick: SignOut,
            restricted: true
        }
    ];

    // Create link
    const element = (item, i) => (
        <NavItem key={i}>
            <NavLink href={item.link} onClick={item.onClick}>
                {item.text}
            </NavLink>
        </NavItem>
    );

    // Show links depending on auth status
    const showItems = () =>
        user
            ? items.map((item, i) => {
                  if (user.isAuthenticated) {
                      return !item.exclude ? element(item, i) : null;
                  } else {
                      return !item.restricted ? element(item, i) : null;
                  }
              })
            : null;

    return (
        <Nav className="ml-auto" navbar>
            {showItems()}
        </Nav>
    );
};

NavItems.propTypes = {
    user: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        user: state.auth
    };
};

export default connect(
    mapStateToProps,
    { logout }
)(NavItems);
