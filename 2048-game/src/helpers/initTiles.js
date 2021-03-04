import { createNewTiles } from "./createTiles";

const initTiles = (size) => {
  const tiles = createNewTiles([], size);
  return createNewTiles(tiles, size);
};

export { initTiles };
