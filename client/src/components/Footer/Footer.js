import React from "react";
import "./Footer.css";

const Footer = () => {
    return (
        <footer>
            <span>Copyright &copy; AlgoProToday</span>
            <span
                className="scroll-top"
                dangerouslySetInnerHTML={{ __html: "&#x2B99" }}
                onClick={() => window.scrollTo(0, 0)}
            />
        </footer>
    );
};

export default Footer;
