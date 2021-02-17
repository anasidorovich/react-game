import React from "react";
import "./grid-item-container.css";

const GridItemContainer = () => {
  return (
    <div className="tile-container">
      <div className="tile tile-2 tile-position-1-1">
        <div className="tile-inner">2</div>
        <img
          src="https://i.pinimg.com/564x/9b/14/e9/9b14e993e1d3eee881f859331de1e0e7.jpg"
          width="105"
        />
      </div>
      <div className="tile tile-4 tile-position-1-2"></div>
      <div className="tile tile-8 tile-position-1-3"></div>
      <div className="tile tile-16 tile-position-1-4"></div>
      <div className="tile tile-32 tile-position-4-1"></div>
      <div className="tile tile-64 tile-position-4-2"></div>
      <div className="tile tile-2 tile-position-4-3"></div>
      <div className="tile tile-4 tile-position-4-4"></div>
      <div className="tile tile-16 tile-position-2-1 tile-new"></div>
      <div className="tile tile-32 tile-position-2-2">8</div>
      <div className="tile tile-2 tile-position-3-1">8</div>
      <div className="tile tile-8 tile-position-3-2">8</div>
      <div className="tile tile-16 tile-position-3-3">8</div>
      <div className="tile tile-64 tile-position-3-4">8</div>
      <div className="tile tile-16 tile-position-2-3">16</div>

    </div>
  );
};

export default GridItemContainer;