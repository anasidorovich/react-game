import React from "react";
import PropTypes from "prop-types";
import { LEVELS, gridSizeMap } from "../../constants";
const OptionsPopup = ({
  difficultyNum,
  gridSize,
  show,
  onChangeGridSize,
  onClickClose,
  onChangeLevel,
}) => {
  return (
    <div
      className={`options-container ${
        show ? "" : "fade"
      } alert-warning text-primary mb-5`}
    >
      <button type="button" className="close" onClick={onClickClose}>
        &times;
      </button>
      <div className="d-flex align-items-baseline">
        <div className="fa fa-cog"></div>
      </div>
      <div className="content-wrapper">
        <div className="section">
          <h6>Sounds</h6>
          <div className="custom-control custom-checkbox mb-3">
            <input
              type="checkbox"
              className="custom-control-input"
              id="check-sound"
              checked=""
              onChange={onChangeLevel}
            />
            <label
              className="custom-control-label"
              htmlFor="check-sound"
            ></label>
          </div>
        </div>
        <div className="section">
          <h6>Music</h6>
          <fieldset className="form-group">
            <label htmlFor="customRange1"></label>
            <input type="range" className="custom-range" id="customRange1" />
          </fieldset>
        </div>
        <div className="section">
          <h6 className="mode">Board Mode</h6>
          <div className="form-group">
            <select
              className="custom-select text-primary"
              onChange={onChangeGridSize}
              defaultValue={gridSize}
            >
              {[...gridSizeMap.keys()].map((size, index) => (
                <option
                  value={size}
                  key={index + 500}
                  className="dropdown-item"
                  onClick={onChangeGridSize}
                >
                  {gridSizeMap.get(size)}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="section">
          <h6 className="difficulty">Difficulty</h6>
          <div className="form-group">
            <select
              onChange={onChangeLevel}
              className="custom-select text-primary"
              defaultValue={difficultyNum}
            >
              {LEVELS.map((num, index) => (
                <option value={num} key={index + 700} className="dropdown-item">
                  {num}
                </option>
              ))}
            </select>
          </div>
        </div>
        <h6>Full Screen</h6>
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="check-fullscreen"
            checked=""
            onChange={onChangeLevel}
          />
          <label
            className="custom-control-label "
            htmlFor="check-fullscreen"
          ></label>
        </div>
      </div>
    </div>
  );
};

export default OptionsPopup;
