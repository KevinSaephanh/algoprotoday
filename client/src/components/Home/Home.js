import React from "react";
import { Button } from "react-bootstrap";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to AlgoProToday</h1>
      <p>
        Start your path to becoming a pro algorithms solver today!
        <br />
        Gain the necessary skills to ace your next coding interview!
      </p>
      <div>
        <Button className="big-btn" variant="light">
          Sample Challenge
        </Button>
      </div>
      <Button variant="light" onClick={() => (window.location = "/register")}>
        Signup
      </Button>
    </div>
  );
};

export default Home;
