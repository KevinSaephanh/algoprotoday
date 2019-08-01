import React from "react";
import { connect } from "react-redux";
import { Nav } from "react-bootstrap";

const NavItems = ({ user }) => {
  const items = [
    {
      text: "Challenges",
      link: "/challenges",
      restrictured: false
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
      link: "/logout",
      restricted: true
    }
  ];

  const element = (item, i) => (
    <Nav.Link key={i} href={item.link}>
      {item.text}
    </Nav.Link>
  );

  const showItems = () =>
    user.login
      ? items.map((item, i) => {
          if (user.login.isAuthenticated) {
            return !item.exclude ? element(item, i) : null;
          } else {
            return !item.restricted ? element(item, i) : null;
          }
        })
      : null;

  return <Nav className="ml-auto">{showItems}</Nav>;
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(NavItems);
