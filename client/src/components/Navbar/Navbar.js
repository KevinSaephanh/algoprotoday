import React from "react";
//import NavItems from "./NavItems";
import { Navbar } from "react-bootstrap";
import "./Navbar.css";
import SignedOutLinks from "./LoggedOutLinks";

const AppNavbar = () => {
  return (
    <Navbar expand="lg">
      <Navbar.Brand href="/">AlgoPT</Navbar.Brand>
      <Navbar.Toggle
        style={{ background: "white", width: "60px", height: "50px" }}
        aria-controls="responsive-navbar-nav"
      />
      <Navbar.Collapse id="responsive-navbar-nav">
        <SignedOutLinks />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;
