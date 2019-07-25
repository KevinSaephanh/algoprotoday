import React from "react";
import { NavLink } from "react-router-dom";

const SignedOutLinks = () => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink className="nav-item" to="/challenges">
          Challenges
        </NavLink>
      </li>
      <li>
        <NavLink className="nav-item" to="/register">
          Register
        </NavLink>
      </li>
      <li>
        <NavLink className="nav-item" to="/login">
          Login
        </NavLink>
      </li>
    </ul>
  );
};

export default SignedOutLinks;
