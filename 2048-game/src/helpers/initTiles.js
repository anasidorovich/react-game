import { createTile } from "./tilesCreator";

const initTiles = (size) => {
  console.log("initTiles");
  const tiles = createNewTiles([], size);
  return createNewTiles(tiles, size);
};

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
    row = Math.floor(Math.random() * size);
    col = Math.floor(Math.random() * size);

    const sum = row * size + col;
    filledItems.add(sum);
  } while (startSize === filledItems.size);

  return [...tiles, createTile(row, col, 2)];
}

export { initTiles, createNewTiles };
