import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import groupArrayThenSort from "group-array-then-sort";
import {
  getLocalStorage,
  setLocalStorage,
  clearLocalStorage,
} from "../../hooks";
import { storageNames, statsMock } from "../../constants";
import Spinner from "../spinner";

function groupBy(list, keyGetter) {
  const map = new Map();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}

const RecordsPage = () => {
  const [isLoad, setLoadState] = useState(false);
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    const stats = getLocalStorage(storageNames.stats) || [];
    const sortedObj = [];
    const groupedByMode = groupBy(
      stats.concat(statsMock).filter((obj) => obj.win),
      (obj) => obj.mode
    );
    [...groupedByMode.values()].map((modes) => {
      const groupedByLevel = groupBy(modes, (obj) => obj.level);
      [...groupedByLevel.values()].map((levels) => {
        const scores = levels.sort((a, b) => a.score - b.score);
        sortedObj.push(scores);
      });
    });

    setStatistics(sortedObj.flat());
    setLoadState(true);
  }, []);

  const loader = isLoad ? null : <Spinner />;
  const mainContent = isLoad ? (
    <table className="table table-bordered table-responsive-sm table-hover">
      <thead className="table-warning">
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Difficulty</th>
          <th scope="col">Mode</th>
          <th scope="col">Score</th>
        </tr>
      </thead>
      <tbody>
        {statistics.map((obj, index) => {
          const { date, level, mode, score } = obj;
          return (
            <tr
              className={`${
                index % 2 === 0 ? "table-secondary" : "table-primary"
              }`}
              key={nanoid()}
            >
              <th scope="row">{date}</th>
              <td>{level}</td>
              <td>{mode}</td>
              <td>{score}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  ) : null;

  return (
    <div className="container stats">
      {loader}
      {mainContent}
    </div>
  );
};

export default RecordsPage;
