import React from "react";
import PropTypes from 'prop-types';
import "./grid-container.css";

const GridContainer = ({ data }) => {
  const items = data.map((row, rowIndex) => {
    return (
      <div key={rowIndex} className="grid-row">
        {row.map((num, index) => (
          <div className="grid-cell" key={index + 100} />
        ))}
      </div>
    );
  });
  return <div className="grid-container ">{items}</div>;
};

export default GridContainer;

GridContainer.propTypes = {
  data: PropTypes.array,
};
