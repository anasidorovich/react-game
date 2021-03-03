import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./header.css";
import { themesMap, gridSizeMap } from "../../constants";
import HotKeys from "./hotkeys";

const Header = ({
  gridSize,
  onChangeTheme,
  onSizeSelect,
  switcher,
  currentTheme,
}) => {
  const onSwitchTheme = (e) => {
    const themeName = e.target.innerHTML;
    const theme = [...themesMap.keys()].find(
      (key) => themesMap.get(key) === themeName
    );
    onChangeTheme(theme);
  };

  return (
    <header className="app-header bg-primary mb-4 mb-1">
      <nav
        className={`container navbar navbar-expand-lg navbar-dark bg-primary`}
      >
        <div className="navbar-brand" href="#">
          2048
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Game
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/statistics">
                Statistics
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/records">
                LeaderBoard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {themesMap.get(currentTheme)}
              </a>
              <ul className="dropdown-menu">
                {[...themesMap.values()].map((theme, index) => (
                  <li
                    key={index}
                    className="dropdown-item"
                    onClick={onSwitchTheme}
                  >
                    {theme}
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
        <HotKeys />
      </nav>
    </header>
  );
};
export default Header;

Header.propTypes = {
  onChangeTheme: PropTypes.func,
  gridSize: PropTypes.number,
  onSizeSelect: PropTypes.func,
};
