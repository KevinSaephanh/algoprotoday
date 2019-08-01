import React from "react";
import { Nav } from "react-bootstrap";

const SignedOutLinks = () => {
  return (
    <Nav className="ml-auto">
      <li>
        <Nav.Link href="/challenges">Challenges</Nav.Link>
      </li>
      <li>
        <Nav.Link href="/register">Register</Nav.Link>
      </li>
      <li>
        <Nav.Link href="/login">Login</Nav.Link>
      </li>
    </Nav>
  );
};

export default SignedOutLinks;
