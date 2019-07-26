import React from "react";
import { Link } from "react-router-dom";
//import LoggedInLinks from "./LoggedInLinks";
import LoggedOutLinks from "./LoggedOutLinks";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        AlgoPT
      </Link>
      <LoggedOutLinks />
    </nav>
  );
};

export default Navbar;
