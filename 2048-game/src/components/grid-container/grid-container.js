import React from "react";
import "./grid-container.css";

const GridContainer = ({ data }) => {
  const items = data.map((row, rowIndex) => {
    return (
      <div key={rowIndex} className="grid-row">
        {row.map((num, index) => (
          <div className="grid-cell" key={index} />
        ))}
      </div>
    );
  });
  return <div className="grid-container ">{items}</div>;
};

export default GridContainer;
