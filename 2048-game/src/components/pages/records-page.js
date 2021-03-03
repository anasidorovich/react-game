import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { getLocalStorage } from "../../hooks";
import { storageNames, statsMock } from "../../constants";
import Spinner from "../spinner";

const RecordsPage = () => {
  const [isLoad, setLoadState] = useState(false);
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    const stats = getLocalStorage(storageNames.stats) || [];
    const sortedObj = stats.concat(statsMock).filter((obj) => obj.win);
    if (sortedObj.length > 10) {
      sortedObj.slice(sortedObj.length - 10);
    }
    setStatistics(sortedObj.reverse());
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
