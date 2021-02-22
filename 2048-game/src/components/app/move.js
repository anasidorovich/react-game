import { cloneDeep } from "lodash";
import matrixRotate from "matrix-rotate";
import { tileStates } from "./tilesCreator";

const directions = {
  UP: "ArrowUp",
  DOWN: "ArrowDown",
  RIGHT: "ArrowRight",
  LEFT: "ArrowLeft",
};

const move = (initTiles, direction, size) => {
  const tiles = cloneDeep(initTiles);

  const gridItems = Array.from(new Array(size), () =>
    Array.from(new Array(size), () => 0)
  );

  tiles.forEach((tile) => {
    gridItems[tile.row][tile.col] = tile;
  });

  rotateFrom(gridItems, direction);

  for (let j = 0; j < size; j++) {
    for (let i = 0; i < size; i++) {
      if (gridItems[j][i] !== 0) {
        moveTile(gridItems, i, j);
      }
    }
  }

  rotateTo(gridItems, direction);

  for (let j = 0; j < size; j++) {
    for (let i = 0; i < size; i++) {
      if (gridItems[i][j] === 0) continue;
      gridItems[i][j].col = j;
      gridItems[i][j].row = i;
    }
  }

  tiles
    .filter((tile) => tile.mergedFrom != null)
    .forEach((tile) => {
      tile.col = tile.mergedFrom.col;
      tile.row = tile.mergedFrom.row;
      delete tiles.mergedFrom;
    });

  return tiles;
};

function moveTile(gridItems, col, row) {
  let nextRow = row - 1;
  let currentRow = row;

  while (nextRow >= 0) {
    if (gridItems[nextRow][col] === 0) {
      gridItems[nextRow][col] = gridItems[currentRow][col];
      gridItems[currentRow][col].state = tileStates.MOVING;
      gridItems[currentRow][col] = 0;
      currentRow = nextRow;
    } else if (
      gridItems[nextRow][col].value === gridItems[currentRow][col].value &&
      (gridItems[nextRow][col].state === tileStates.IDLE ||
        gridItems[nextRow][col].state === tileStates.MOVING)
    ) {
      gridItems[nextRow][col].state = tileStates.DYING;
      gridItems[nextRow][col].mergedFrom = gridItems[currentRow][col];
      gridItems[currentRow][col].state = tileStates.INCREASE;
      gridItems[nextRow][col] = gridItems[currentRow][col];
      gridItems[currentRow][col] = 0;
      currentRow = nextRow;
    } else {
      break;
    }

    nextRow -= 1;
  }
}

function rotateFrom(gridItems, direction) {
  switch (direction) {
    case directions.LEFT:
      matrixRotate(gridItems);
      break;
    case directions.DOWN:
      matrixRotate(gridItems);
      matrixRotate(gridItems);
      break;
    case directions.RIGHT:
      matrixRotate(gridItems);
      matrixRotate(gridItems);
      matrixRotate(gridItems);
      break;
    default:
      break;
  }
}
function rotateTo(gridItems, direction) {
  switch (direction) {
    case directions.LEFT:
      matrixRotate(gridItems);
      matrixRotate(gridItems);
      matrixRotate(gridItems);
      break;
    case directions.DOWN:
      matrixRotate(gridItems);
      matrixRotate(gridItems);
      break;
    case directions.RIGHT:
      matrixRotate(gridItems);
      break;
    default:
      break;
  }
}

function removeAndIncreaseTiles(score, tiles) {
  const filteredTiles = tiles
    .filter((tile) => tile.state !== tileStates.DYING)
    .map((tile) => {
      if (tile.state === tileStates.INCREASE) {
        tile.value *= 2;
        score += tile.value;
      }

      tile.state = tileStates.IDLE;

      return tile;
    });

  return [filteredTiles, score];
}
export { move, directions, removeAndIncreaseTiles };
