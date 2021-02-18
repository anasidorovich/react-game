import React from "react";
import "./footer.css";

const Footer = ({ theme }) => {
  return (
    <footer className="page-footer">
      <div className={ `container bg-${theme}`} />
    </footer>
  );
};

export default Footer;
