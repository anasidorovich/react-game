import {uniqueId} from 'lodash'

const tileStates = {
  IDLE: "IDLE",
  MOVING: "MOVING",
  DYING: "DYING",
  INCREASE: "INCREASE",
}

const createTile = (row, col, value, id) => ({
  row, col, value, id: id ? id : uniqueId(), state: tileStates.IDLE
})

export {createTile, tileStates}