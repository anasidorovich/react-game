import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import { THEMES } from "./constants";
ReactDOM.render(
  <ThemeSwitcherProvider themeMap={THEMES}>
    <Router>
      <App />
    </Router>
  </ThemeSwitcherProvider>,
  document.getElementById("root")
);
