import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="left">
        <p>Copyright &copy; AlgoProToday</p>
      </div>
      <div className="right">
        <p
          dangerouslySetInnerHTML={{ __html: "&#x2B99" }}
          onClick={() => window.scrollTo(0, 0)}
        />
      </div>
    </footer>
  );
};

export default Footer;
