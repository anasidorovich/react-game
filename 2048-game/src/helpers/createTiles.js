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
  isNew: true,
  state: tileStates.IDLE,
});

function getRandom(size) {
  return Math.floor(Math.random() * size);
}

function createNewTiles(tiles, size) {
  const filledItems = new Set();

  tiles.forEach((tile) => {
    delete tile.isNew;
    filledItems.add(tile.row * size + tile.col);
  });

  if (filledItems.size === size * size) return;

  let row;
  let col;
  let startSize = filledItems.size;
  do {
    row = getRandom(size - 0.1);
    col = getRandom(size - 0.1);

    const sum = row * size + col;
    filledItems.add(sum);
  } while (startSize === filledItems.size);

  const value = getRandom(2) > 0 ? 2 : 4;

  return [...tiles, createTile(row, col, value)];
}

export { createTile, createNewTiles, tileStates };
