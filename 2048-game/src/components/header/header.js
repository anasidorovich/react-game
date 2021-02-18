import React, { useState } from "react";
import "./header.css";

const Header = ({ onChangeTheme, theme }) => {
  const themes = [
    "Unicorns",
    "Coffee"
  ];
  return (
    <header className="app-header mb-4 mb-1">
      <nav className={ `navbar navbar-expand-lg navbar-dark bg-${theme}` }>
        <div className="navbar-brand ml-5" href="#">
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
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Home
                <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Pricing
              </a>
            </li>
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
                  <li key={index} className='dropdown-item' onClick={onChangeTheme}>
                    {theme}
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
