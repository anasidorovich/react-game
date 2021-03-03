import React from "react";

import "./spinner.css";

const Spinner = () => {
  return (
    <div className="spinner d-flex justify-content-center">
      <div className="spinner-border text-warning" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
