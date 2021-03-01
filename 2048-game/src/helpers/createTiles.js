import { nanoid } from "nanoid";

const tileStates = {
  IDLE: "IDLE",
  MOVING: "MOVING",
  DYING: "DYING",
  INCREASE: "INCREASE",
};

const createTile = (row, col, value) => ({
  row,
  col,
  value,
  id: nanoid(),
  state: tileStates.IDLE,
});

function createNewTiles(tiles, size) {
  const filledItems = new Set();

  tiles.forEach((tile) => {
    filledItems.add(tile.row * size + tile.col);
  });

  if (filledItems.size === size * size) return;

  let row;
  let col;
  let startSize = filledItems.size;
  do {
    row = Math.floor(Math.random() * (size - 0.1));
    col = Math.floor(Math.random() * (size - 0.1));

    const sum = row * size + col;
    filledItems.add(sum);
  } while (startSize === filledItems.size);

  return [...tiles, createTile(row, col, 2)];
}

export { createTile, createNewTiles, tileStates };
