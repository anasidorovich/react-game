import React from "react";
import PropTypes from "prop-types";
import "./game-heading.css";

const GameHeading = ({
  score,
  bestScore,
  onClickNewGame,
  onClickAutoPlay,
  onClickOptions,
  playable,
}) => {
  const autoPlayBtnName = playable ? "Stop" : "Autoplay";
  return (
    <div className="game-heading pl-lg-0 pr-lg-0 d-flex">
      <div className="play d-flex">
        <button
          type="button"
          className={`btn btn-primary mb-2 mr-2`}
          onClick={onClickAutoPlay}
        >
          {autoPlayBtnName}
        </button>
        <button
          type="button"
          className="btn btn-warning mb-2"
          onClick={onClickNewGame}
        >
          New Game
        </button>
      </div>
      <div className="score-container d-flex flex-column align-items-center">
        <div className="d-flex align-items-baseline">
          <div
            className={`score d-flex flex-column bg-primary mb-2 mr-2 text-uppercase`}
          >
            score
            <span className="">{score}</span>
          </div>
          <div
            className={`record d-flex flex-column bg-primary mb-2 text-uppercase`}
          >
            best
            <span>{bestScore}</span>
          </div>
        </div>
        <div className="options d-flex">
          <button type="button" className="btn btn-primary">
            options
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameHeading;

GameHeading.propTypes = {
  onClickNewGame: PropTypes.func,
  onClickAutoPlay: PropTypes.func,
  playable: PropTypes.bool,
  score: PropTypes.number,
  bestScore: PropTypes.number,
};
