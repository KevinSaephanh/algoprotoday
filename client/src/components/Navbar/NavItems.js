import React from "react";
import { connect } from "react-redux";
import { Nav } from "react-bootstrap";

const NavItems = ({ user }) => {
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
      link: "/user",
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
      restricted: true
    }
  ];

  // Create link
  const element = (item, i) => (
    <Nav.Link key={i} href={item.link}>
      {item.text}
    </Nav.Link>
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

  return <Nav className="ml-auto">{showItems()}</Nav>;
};

const mapStateToProps = state => {
  return {
    user: state.auth
  };
};

export default connect(mapStateToProps)(NavItems);
