import React from "react";
import PropTypes from "prop-types";
import { useThemeSwitcher } from "react-css-theme-switcher";
import "./header.css";

const Header = ({ gridSize, onChangeTheme, onSizeSelect }) => {
  const themes = ["Unicorns", "Cats"];
  const defaultBgColor = "linear-gradient(to bottom, #a741ff 0%, #5480fd 100%)";
  const { switcher, themes: th } = useThemeSwitcher();

  const onSwitchTheme = (e) => {
    const theme = e.target.innerHTML;
    if (theme === "Cats") {
      switcher({ theme: th.dark });
      document.body.style.background = "#fff";
    } else {
      switcher({ theme: th.primary });
      document.body.style.background = defaultBgColor;
    }
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
              <a className="nav-link" href="#">
                About
              </a>
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
                Theme
              </a>
              <ul className="dropdown-menu">
                {themes.map((theme, index) => (
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
            <li>
              <select
                defaultValue={gridSize}
                className="form-select"
                aria-label="Default select example"
                onChange={onSizeSelect}
              >
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
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
