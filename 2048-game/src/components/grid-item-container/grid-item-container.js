import React from "react";
import "./grid-item-container.css";

const GridItemContainer = ({ items }) => {
  const TileView = ({ tile, id }) => {
    const classArray = ["tile"];
    classArray.push(`data-id=${id} tile-${tile.value}`);
    classArray.push(`tile-position-${tile.col + 1}-${tile.row + 1}`);
    /* if (!tile.mergedInto) {
        classArray.push('position_' + tile.row + '_' + tile.column);
      }
      if (tile.mergedInto) {
        classArray.push('merged');
      }
      if (tile.isNew()) {
        classArray.push('new');
      }
      if (tile.hasMoved()) {
        classArray.push('row_from_' + tile.fromRow() + '_to_' + tile.toRow());
        classArray.push('column_from_' + tile.fromColumn() + '_to_' + tile.toColumn());
        classArray.push('isMoving');
      } */
    const classes = classArray.join(" ");
    return (
      <div className={classes}>
        <div className="tile-inner">
          <span>{tile.value}</span>
        </div>
      </div>
    );
  };

  const tiles = items
      .map((tile) => <TileView tile={tile} id={tile.id} key={tile.id} />);
  return <div className="tile-container">{tiles}</div>;
};

export default GridItemContainer;
