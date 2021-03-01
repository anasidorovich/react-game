import React from "react";
import PropTypes from "prop-types";
import { LEVELS, gridSizeMap } from "../../constants";
import "./options.css";
const OptionsPopup = ({
  difficultyNum,
  gridSize,
  show,
  onChangeGridSize,
  onClickClose,
  onChangeLevel,
  soundIsChecked,
  musicIsChecked,
  onChangeSound,
  soundsVolume,
  musicVolume,
  onChangeMusic,
  onChangeSoundsVolume,
  onChangeMusicVolume,
}) => {
  return (
    <div
      className={`options-container ${
        show ? "" : "fade"
      } bg-warning text-primary mb-5`}
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
              checked={soundIsChecked}
              onChange={onChangeSound}
            />
            <label
              className="custom-control-label"
              htmlFor="check-sound"
            ></label>
          </div>
        </div>
        <div className="section">
          <h6>Sounds Volume</h6>
          <fieldset className="form-group">
            <label htmlFor="soundsRange"></label>
            <input
              type="range"
              min={0}
              max={1}
              step={0.02}
              value={soundsVolume}
              onChange={onChangeSoundsVolume}
              className="custom-range"
              id="soundsRange"
            />
          </fieldset>
        </div>
        <div className="section">
          <h6>Music</h6>
          <div className="custom-control custom-checkbox mb-3">
            <input
              type="checkbox"
              className="custom-control-input"
              id="check-music"
              checked={musicIsChecked}
              onChange={onChangeMusic}
            />
            <label
              className="custom-control-label"
              htmlFor="check-music"
            ></label>
          </div>
        </div>
        <div className="section">
          <h6>Music Volume</h6>
          <fieldset className="form-group">
            <label htmlFor="musicVolumeRange"></label>
            <input
              type="range"
              min={0}
              max={1}
              step={0.02}
              value={musicVolume}
              onChange={onChangeMusicVolume}
              className="custom-range"
              id="musicVolumeRange"
            />
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
      </div>
    </div>
  );
};

export default OptionsPopup;
