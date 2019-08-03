import React from "react";
import NavItems from "./NavItems";
import { Navbar } from "react-bootstrap";
import "./Navbar.css";

const AppNavbar = () => {
  return (
    <Navbar expand="lg">
      <Navbar.Brand href="/">AlgoPT</Navbar.Brand>
      <Navbar.Toggle
        className="navbar-toggler"
        aria-controls="responsive-navbar-nav"
      />
      <Navbar.Collapse id="responsive-navbar-nav">
        <NavItems />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;
