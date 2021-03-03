import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="bg-primary text-center text-white pt-4">
      <div className="container d-flex flex-column">
        <div className="align-self-start pb-3">You can find me at</div>
        <div className="socials d-flex">
          <ul className="list-inline social-buttons">
            <li className="list-inline-item">
              <a
                href="https://www.instagram.com/sidorovich.anastasiya/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </li>

            <li className="list-inline-item">
              <a
                href="https://www.linkedin.com/in/anastasiya-sidarovich/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </li>
          </ul>
          <a
            href="https://rs.school/js/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="rs-school"></div>
          </a>
          <ul className="list-inline social-buttons">
            <li className="list-inline-item">
              <a
                href="https://github.com/anasidorovich/react-game/tree/react-game"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-github"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-youtube"></i>
              </a>
            </li>
            <li className="list-inline-item"></li>
          </ul>
        </div>
      </div>
      <div className="copy text-center p-3">© 2021 RS School</div>
    </footer>
  );
};

export default Footer;
