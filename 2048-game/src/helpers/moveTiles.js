import { cloneDeep } from "lodash";
import { tileStates } from "./createTiles";

const directions = {
  UP: "ArrowUp",
  DOWN: "ArrowDown",
  RIGHT: "ArrowRight",
  LEFT: "ArrowLeft",
};

const move = (initTiles, direction, size) => {
  let moved = false;
  const tiles = cloneDeep(initTiles);

  const gridItems = Array.from(new Array(size), () =>
    Array.from(new Array(size), () => 0)
  );

  tiles.forEach((tile) => {
    tile.merged = false;
    gridItems[tile.row][tile.col] = tile;
  });

  rotateFrom(gridItems, direction);

  for (let j = 0; j < size; j++) {
    for (let i = 0; i < size; i++) {
      if (gridItems[j][i] !== 0) {
        moved = moveTile(gridItems, i, j);
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
      delete tile.mergedFrom;
    });

  return { moved: moved, tiles: tiles };
};

function moveTile(gridItems, col, row) {
  let moved = false;
  let nextRow = row - 1;
  let currentRow = row;

  while (nextRow >= 0) {
    moved = true;
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
      gridItems[currentRow][col].merged = true;
      gridItems[currentRow][col].state = tileStates.INCREASE;
      gridItems[nextRow][col] = gridItems[currentRow][col];
      gridItems[currentRow][col] = 0;
      currentRow = nextRow;
    } else {
      moved = false;
      break;
    }
    nextRow -= 1;
  }
  return moved;
}

function rotateFrom(gridItems, direction) {
  switch (direction) {
    case directions.LEFT:
      rotateClockwise(gridItems);
      break;
    case directions.DOWN:
      rotateClockwise(gridItems);
      rotateClockwise(gridItems);
      break;
    case directions.RIGHT:
      rotateClockwise(gridItems);
      rotateClockwise(gridItems);
      rotateClockwise(gridItems);
      break;
    default:
      break;
  }
}
function rotateTo(gridItems, direction) {
  switch (direction) {
    case directions.LEFT:
      rotateClockwise(gridItems);
      rotateClockwise(gridItems);
      rotateClockwise(gridItems);
      break;
    case directions.DOWN:
      rotateClockwise(gridItems);
      rotateClockwise(gridItems);
      break;
    case directions.RIGHT:
      rotateClockwise(gridItems);
      break;
    default:
      break;
  }
}

function combine(score, tiles, difficultyNum) {
  let hasWon = false;
  const filteredTiles = tiles
    .filter((tile) => tile.state !== tileStates.DYING)
    .map((tile) => {
      if (tile.state === tileStates.INCREASE) {
        tile.value *= 2;
        score += tile.value;
        if (tile.value === difficultyNum) {
          hasWon = true;
        }
      }
      tile.state = tileStates.IDLE;

      return tile;
    });

  return { tiles: filteredTiles, score: score, hasWon: hasWon };
}

const rotateClockwise = (matrix) => {
  matrix = matrix.reverse();
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < i; j++) {
      var temp = matrix[i][j];
      matrix[i][j] = matrix[j][i];
      matrix[j][i] = temp;
    }
  }
};
/*
function printMatrix(matrix) {
  let printString = '[\n'

  Array.from(new Array(matrix.length), (x, i) => i).forEach(colNum => {
    printString += '  '
    printString += Array.from(new Array(matrix.length), (x, i) => i)
      .map(rowNum => matrix[colNum][rowNum].row ? JSON.stringify(matrix[colNum][rowNum].row+"-"+matrix[colNum][rowNum].col):"0")
      .join(', ')
    printString += ',\n'
  })

  printString += ']'
  console.log(printString)
}*/

export { move, directions, combine };
