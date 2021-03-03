import { getLocalStorage, setLocalStorage } from "../hooks";
import { storageNames } from "../constants";

export default function setLocalStorageStats(value) {
  const stats = getLocalStorage(storageNames.stats);
  const { level, mode, score, win } = value;
  const date = new Date().toLocaleDateString();
  const newItem = { date, level, mode, score, win };
  let newStats;
  if (stats) {
    newStats = [...stats, newItem];
  } else {
    newStats = [newItem];
  }
  setLocalStorage(storageNames.stats, newStats);
}
