import { createNewTiles } from "./createTiles";

const initTiles = (size) => {
  console.log("initTiles");
  const tiles = createNewTiles([], size);
  return createNewTiles(tiles, size);
};

export { initTiles };
