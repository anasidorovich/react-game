import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useThemeSwitcher } from "react-css-theme-switcher";
import "./header.css";
import { themesMap, gridSizeMap } from "../../constants";
import { AboutPage, GamePage } from "../pages";

const Header = ({ gridSize, onChangeTheme, onSizeSelect }) => {
  const defaultBgColor = "linear-gradient(to bottom, #a741ff 0%, #5480fd 100%)";
  const { switcher, currentTheme } = useThemeSwitcher();

  const onSwitchTheme = (e) => {
    const themeName = e.target.innerHTML;
    const theme = [...themesMap.keys()].find(
      (key) => themesMap.get(key) === themeName
    );
    switcher({ theme: theme });
    onChangeTheme(themeName);
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
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/statistics">
                Statistics
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
            <li className="nav-item dropdown mr-5">
              <a
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {gridSizeMap.get(gridSize)}
              </a>
              <ul className="dropdown-menu">
                {[...gridSizeMap.keys()].map((size, index) => (
                  <li
                    id={size}
                    key={index + 500}
                    className="dropdown-item"
                    onClick={onSizeSelect}
                  >
                    {gridSizeMap.get(size)}
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;

Header.propTypes = {
  onChangeTheme: PropTypes.func,
};
