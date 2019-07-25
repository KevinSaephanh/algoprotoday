import React from "react";
import { NavLink } from "react-router-dom";

const LoggedInLinks = () => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink className="nav-item" to="/:id">
          Profile
        </NavLink>
      </li>
      <li>
        <NavLink className="nav-item" to="/challenges">
          Challenges
        </NavLink>
      </li>
      <li>
        <NavLink className="nav-item" to="/vcx">
          Log out
        </NavLink>
      </li>
    </ul>
  );
};

export default LoggedInLinks;
