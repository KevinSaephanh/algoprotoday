import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="left">
        <p>Copyright &copy; AlgoProToday</p>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: "&#x2B99" }}
        className="right"
        onClick={() => window.scrollTo(0, 0)}
      />
    </footer>
  );
};

export default Footer;
