import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <span className="left">Copyright &copy; AlgoProToday</span>
      <span
        className="right"
        dangerouslySetInnerHTML={{ __html: "&#x2B99" }}
        onClick={() => window.scrollTo(0, 0)}
      />
    </footer>
  );
};

export default Footer;
