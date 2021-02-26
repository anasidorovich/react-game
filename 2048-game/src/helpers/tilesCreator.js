import { uniqueId } from "lodash";

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

export { createTile, tileStates };
