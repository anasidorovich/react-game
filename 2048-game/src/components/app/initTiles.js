import {createTile} from './tilesCreator'

const initTilesTemp = (size, data) => {
 console.log(data);
  const position1 = getItemPosition(size, data);
  const tile1 = createTile(position1.row, position1.col, 2);
  const position2 = getItemPosition(size, data);
  const tile2 = createTile(position2.row, position2.col, 2);

  return [tile1, tile2];
}

const initTiles = (size) => {
  let tiles = createNewTiles([], size);
  console.log(tiles);
  return createNewTiles(tiles, size);
}

const generateNextTile = (size, data) => {
  const position = getItemPosition(size, data);
  const tile = createTile(position.row, position.col, 2);
  return [tile];
}

const getItemPosition = (size, data) => {
  console.log(size);
  console.log(data);
  const rowPosition = Math.floor(Math.random() * size);
  const colPosition = Math.floor(Math.random() * size);
  if (data[colPosition][rowPosition].value !== 0 ) {
    //getItemPosition(size, data);
  }
  return { row: rowPosition, col: colPosition};
}

function createNewTiles(tiles, size) {
  const occupiedCoords = new Set()

  tiles.forEach(tile => {
    occupiedCoords.add(tile.row * size + tile.col)
  })

  if (occupiedCoords.size === size * size) return

  let row
  let col
  let startSize = occupiedCoords.size
  do {
    row = Math.floor(Math.random() * size)
    col = Math.floor(Math.random() * size)

    const sum = row * size + col
    occupiedCoords.add(sum)
  } while (startSize === occupiedCoords.size)

  return [...tiles, createTile(row, col, 2)]
}

export { initTiles };