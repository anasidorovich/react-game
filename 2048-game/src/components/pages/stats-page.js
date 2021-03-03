import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import {
  getLocalStorage,
  clearLocalStorage,
} from "../../hooks";
import { storageNames } from "../../constants";
import Spinner from "../spinner";

const StatsPage = () => {
  const [isLoad, setLoadState] = useState(false);
  const [statistics, setStatistics] = useState([]);

  const clearStats = () => {
    clearLocalStorage(storageNames.stats);
    setStatistics([]);
  };

  useEffect(() => {
    const stats = getLocalStorage(storageNames.stats) || [];
    setStatistics(stats);
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
          <th scope="col">Result</th>
        </tr>
      </thead>
      <tbody>
        {statistics.map((obj, index) => {
          const { date, level, mode, score, win } = obj;
          const result = win ? <i className="fas fa-trophy"></i> : null;
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
              <td width="50px" className="text-center">
                {result}
              </td>
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
      <button
        type="button"
        className="btn btn-primary mt-2 mb-3"
        onClick={clearStats}
      >
        Clear Statistics
      </button>
    </div>
  );
};

export default StatsPage;
