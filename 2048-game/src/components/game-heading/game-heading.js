import React from 'react';
import './game-heading.css';

const GameHeading = () => {
  return (
      <div className="game-heading container g-0 d-flex">
          <div className="d-flex flex-column">
            <button type="button" className="btn btn-warning mb-2 mr-2">
              Autoplay
            </button>
            <button type="button" className="btn btn-success mr-2 mb-2">
              New Game
            </button>
          </div>
          <div className="score-container d-flex flex-column align-items-center">
            <div className="d-flex align-items-baseline">
              <div className="score d-flex flex-column btn-primary mb-2 mr-2 text-uppercase">
                score
                <span className="">1000</span>
              </div>
              <div className="record d-flex flex-column btn-primary mb-2 text-uppercase">
                best
                <span>1000</span>
              </div>
            </div>
            <div className="d-flex">
              <button type="button" className="btn btn-info">
                options
              </button>
            </div>
          </div>
      </div>
  );
}

export default GameHeading;