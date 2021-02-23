import React from "react";
import PropTypes from 'prop-types';
import "./grid-item-container.css";

const GridItemContainer = ({ items }) => {
  const TileView = ({ tile, id }) => {
    const classArray = ["tile"];
    classArray.push(`data-id=${id} tile-${tile.value}`);
    classArray.push(`tile-position-${tile.col + 1}-${tile.row + 1}`);
    if (tile.merged) {
      classArray.push("tile-merged");
    }
    if (tile.isNew) {
      classArray.push("new");
    }
    const classes = classArray.join(" ");
    return (
      <div className={classes}>
        <div className="tile-inner">
          <span>{tile.value}</span>
        </div>
      </div>
    );
  };

  const tiles = items.map((tile) => (
    <TileView tile={tile} id={tile.id} key={tile.id} />
  ));
  console.log("tiles");
  console.log(tiles);
  return <div className="tile-container">{tiles}</div>;
};

export default GridItemContainer;

GridItemContainer.propTypes = {
  id: PropTypes.number,
  items: PropTypes.array,
  tile: PropTypes.any,
}

