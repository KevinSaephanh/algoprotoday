import React from "react";
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
      <button onClick={() => (window.location = "/register")}>Signup</button>
    </div>
  );
};

export default Home;
