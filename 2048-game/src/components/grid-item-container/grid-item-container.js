import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import "./grid-item-container.css";

const GridItemContainer = ({ items, size }) => {
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
      <Tile {...tile} size={size} className={classes}>
        <div className="tile-inner">
          <span>{tile.value}</span>
        </div>
      </Tile>
    );
  };

  const tiles = items.map((tile) => (
    <TileView tile={tile} id={tile.id} key={tile.id} />
  ));
  return <div className="tile-container">{tiles}</div>;
};

const Tile = styled.div`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  left: ${({ col, size }) => col * (size + 16)}px;
  top: ${({ row, size }) => row * (size + 16)}px;
  transition-property: transform;
  transition: 100ms ease-in-out;
`;

export default GridItemContainer;

GridItemContainer.propTypes = {
  id: PropTypes.number,
  items: PropTypes.array,
  tile: PropTypes.any,
};
