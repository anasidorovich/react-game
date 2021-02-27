import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import "./grid-container.css";

const GridContainer = ({ data, size }) => {
  const items = data.map((row, rowIndex) => {
    return (
      <div key={rowIndex} className="grid-row">
        {row.map((num, index) => (
          <GridCell size={size} className="grid-cell" key={index + 100} />
        ))}
      </div>
    );
  });
  return <div className="grid-container ">{items}</div>;
};

export default GridContainer;

GridContainer.propTypes = {
  data: PropTypes.array,
  size: PropTypes.number,
};

const GridCell = styled.div`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;
