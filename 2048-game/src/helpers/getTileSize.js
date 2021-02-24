const getTileSize = (gridWidth, gridMargin, gridSize) => {
  return (gridWidth - gridMargin * (gridSize + 1)) / gridSize;
};

export default getTileSize;
