import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { useThemeSwitcher } from "react-css-theme-switcher";
import hotkeys from "hotkeys-js";
import useSound from "use-sound";
import { useHistory, BrowserRouter as Router, Route } from "react-router-dom";
import toggleFullscreen, { isFullscreen } from "toggle-fullscreen";
import "./app.css";
import { cloneDeep } from "lodash";
import {
  useEvent,
  getLocalStorage,
  useLocalStorage,
  setLocalStorage,
} from "../../hooks";
import Header from "../header";
import Footer from "../footer";
import GameHeading from "../game-heading";
import GridContainer from "../grid-container";
import GridItemContainer from "../grid-item-container";

import Popup from "./popup";
import {
  initTiles,
  createNewTiles,
  move,
  directions,
  combine,
  getTileSize,
} from "../../helpers";
import {
  GAME,
  THEMES,
  winPopup,
  gameOverPopup,
  storageNames,
  hotKeys,
} from "../../constants";
import OptionsPopup from "../options";
import { AboutPage, StatsPage } from "../pages";
import mergedSound from "../../assets/merged.mp3";
import winSound from "../../assets/success.mp3";
import gameOverSound from "../../assets/game-over.mp3";
import music from "../../assets/game-music.mp3";

function App() {
  const FULLSCREEN = {
    activeClassName: "fullscreen-enabled",
    element: document.querySelector(".fullscreen"),
  };
  const [difficultyNum, setDifficultyNum] = useLocalStorage(
    storageNames.level,
    GAME.difficultyNum
  );
  const [showPopup, setShowPopup] = useState(false);
  const [gridSize, setGridSize] = useLocalStorage(
    storageNames.gridSize,
    GAME.gridSize
  );
  const [tileSize, setTileSize] = useLocalStorage(
    storageNames.tileSize,
    GAME.tileSize
  );

  const getData = () => {
    return Array.from(new Array(gridSize), () =>
      Array.from(new Array(gridSize), () => 0)
    );
  };

  const getStorageStateName = () => {
    return `2048gamaState_${gridSize}_${difficultyNum}`;
  };

  const initState = () => {
    const state = {
      tiles: initTiles(gridSize),
      score: 0,
      gameOver: false,
      hasWon: false,
    };
    setLocalStorage(getStorageStateName(), state);
    return state;
  };

  const [state, setState] = useState(
    getLocalStorage(getStorageStateName()) || initState
  );
  const [bestScore, setBestScore] = useLocalStorage(storageNames.bestScore, 0);
  const [popup, setPopup] = useState(gameOverPopup);
  const [showOptions, setShowOptions] = useState(false);
  const history = useHistory();

  const onHidePopup = () => {
    setState(initState);
  };

  const saveTiles = (state) => {
    if (!playable) {
      const localStore = cloneDeep(state);
      localStore.tiles.forEach((tile) => {
        delete tile.merged;
        delete tile.isNew;
      });
      setLocalStorage(getStorageStateName(), localStore);
    }
  };

  const onClickNewGame = () => {
    setState(initState);
  };

  const onChangeGridSize = (e) => {
    setGridSize(parseInt(e.target.value, 10));
  };

  const onClickAutoPlay = () => {
    setPlayable((prevPlayable) => !prevPlayable);
  };

  const onClickOptions = () => {
    setShowOptions(true);
  };
  const onCloseOptions = () => {
    setShowOptions(false);
  };
  const onChangeLevel = (e) => {
    setDifficultyNum(parseInt(e.target.value, 10));
  };

  const onFullScreenChange = () => {
    toggleFullscreen(FULLSCREEN.element, () => {
      const isFullScreen = isFullscreen();
      if (isFullScreen) {
        FULLSCREEN.element.classList.add(FULLSCREEN.activeClassName);
      } else {
        FULLSCREEN.element.classList.remove(FULLSCREEN.activeClassName);
      }
    });
  };

  const [data, setData] = useState(getData);
  const { switcher, currentTheme, status } = useThemeSwitcher();
  const [theme, setTheme] = useLocalStorage(storageNames.theme, GAME.theme);

  const [playable, setPlayable] = useState(false);
  const [soundIsChecked, setSoundIsChecked] = useLocalStorage(
    storageNames.sound,
    false
  );
  const [musicIsChecked, setMusicIsChecked] = useState(false);
  const [soundsVolume, setSoundsVolume] = useLocalStorage(
    storageNames.soundsVolume,
    0
  );
  const [musicVolume, setMusicVolume] = useLocalStorage(
    storageNames.musicVolume,
    0
  );
  const onChangeSound = (e) => {
    setSoundIsChecked(e.target.checked);
  };

  const onChangeMusic = (e) => {
    setMusicIsChecked(e.target.checked);
  };

  const onChangeSoundsVolume = (e) => {
    setSoundsVolume(e.target.valueAsNumber);
  };

  const onChangeMusicVolume = (e) => {
    setMusicVolume(e.target.valueAsNumber);
  };

  const [playMerged] = useSound(mergedSound, { volume: soundsVolume });
  const [playGameOver] = useSound(gameOverSound, { volume: soundsVolume });
  const [playWin] = useSound(winSound, { volume: soundsVolume });
  const [playMusic, { stop: stopMusic, isPlaying, sound }] = useSound(music, {
    loop: true,
    volume: musicVolume,
  });

  useEffect(() => {
    switcher({ theme: theme });
  }, [theme]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleKeyDown({ key: directions.LEFT }),
    onSwipedRight: () => handleKeyDown({ key: directions.RIGHT }),
    onSwipedUp: () => handleKeyDown({ key: directions.UP }),
    onSwipedDown: () => handleKeyDown({ key: directions.DOWN }),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  hotkeys(Object.values(hotKeys).toString(), function (event, handler) {
    switch (handler.key) {
      case hotKeys.GO_TO_ABOUT:
        history.push("/about");
        break;
      case hotKeys.GO_TO_OPTIONS:
        history.push("/");
        onClickOptions();
        break;
      case hotKeys.MUTE:
        history.push("/");
        setSoundIsChecked(false);
        setMusicIsChecked(false);
        break;
      case hotKeys.SWITCH_TU_PULSE:
        setTheme("primary");
        break;
      case hotKeys.SWITCH_TO_LUX:
        setTheme("dark");
        break;
      default:
        alert(event);
    }
  });

  const handleKeyDown = async (event) => {
    event.preventDefault instanceof Function && event.preventDefault();
    let haveMoved = false;
    if (
      !state.hasWon &&
      !state.gameOver &&
      Object.values(directions).includes(event.key)
    ) {
      setState((prevState) => {
        const { moved, tiles } = move(prevState.tiles, event.key, gridSize);
        haveMoved = moved;
        return {
          ...prevState,
          tiles: tiles,
        };
      });

      await delay(100);

      setState((prevState) => {
        const { tiles, score, hasWon, merged } = combine(
          prevState.score,
          prevState.tiles,
          difficultyNum
        );
        if (soundIsChecked && merged) {
          playMerged();
        }
        return {
          ...prevState,
          score: score,
          tiles: tiles,
          hasWon: hasWon,
        };
      });

      setState((prevState) => {
        let nextState = prevState;
        if (prevState.tiles.length === gridSize * gridSize) {
          nextState = {
            ...prevState,
            gameOver: true,
          };
        } else if (haveMoved) {
          nextState = {
            ...prevState,
            tiles: createNewTiles(prevState.tiles, gridSize),
          };
        }
        saveTiles(nextState);
        return nextState;
      });
    }
  };

  useEffect(() => {
    const { score } = state;
    if (!playable && score > bestScore) {
      setBestScore(score);
    }
  }, [state.score]);

  useEffect(() => {
    const { hasWon } = state;
    if (hasWon) {
      setPlayable(false);
      saveTiles(state);
      setPopup(winPopup);
      if (soundIsChecked) {
        playWin();
      }
    }
  }, [state.hasWon]);

  useEffect(() => {
    const { gameOver } = state;
    if (gameOver) {
      setPlayable(false);
      saveTiles(state);
      setPopup(gameOverPopup);
      if (soundIsChecked) {
        playGameOver();
      }
    }
  }, [state.gameOver]);

  useEffect(() => {
    setTileSize(getTileSize(GAME.gridWidth, GAME.gridMargin, gridSize));
    setData(getData);
    setState(getLocalStorage(getStorageStateName()) || initState);
  }, [gridSize]);

  useEffect(() => {
    if (musicIsChecked) {
      if (!isPlaying) playMusic();
    } else {
      if (isPlaying) stopMusic();
    }
  }, [musicIsChecked]);

  useEffect(() => {
    setState(getLocalStorage(getStorageStateName()) || initState);
  }, [difficultyNum]);

  useEffect(() => {
    let interval;
    if (playable) {
      interval = setInterval(() => {
        const values = Object.values(directions);
        const key = values[Math.floor(Math.random() * values.length)];
        handleKeyDown({ key: key });
      }, 1000);
    } else {
      interval && clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [playable]);

  useEvent("keydown", handleKeyDown);

  if (!currentTheme || status === "loading") {
    return (
      <div className="spinner d-flex justify-content-center bg-primary">
        <div className="spinner-border text-warning" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`app mr-auto ml-auto ${theme}`}>
      <div className="page-wrapper">
        <Header
          onChangeTheme={setTheme}
          onSizeSelect={onChangeGridSize}
          gridSize={gridSize}
          currentTheme={currentTheme}
        />
        <Route path="/about" component={AboutPage} exact />
        <Route path="/statistics" component={StatsPage} exact />
        <Route path="/" exact>
          <GameHeading
            score={state.score}
            bestScore={bestScore}
            onClickNewGame={onClickNewGame}
            onClickAutoPlay={onClickAutoPlay}
            onClickOptions={onClickOptions}
            playable={playable}
          />
          <div className="fullscreen">
            <div
              {...swipeHandlers}
              className="game-container wrapper bg-primary text-uppercase mt-3 mb-5"
            >
              <button
                type="button"
                className="btn fullscreen-btn btn-primary"
                onClick={onFullScreenChange}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-fullscreen"
                  viewBox="0 0 16 16"
                >
                  <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"></path>
                </svg>
              </button>
              <GridContainer data={data} size={tileSize} />
              <GridItemContainer items={state.tiles} size={tileSize} />
            </div>
            {showOptions && (
              <OptionsPopup
                show={showOptions}
                soundIsChecked={soundIsChecked}
                musicIsChecked={musicIsChecked}
                onClickClose={onCloseOptions}
                gridSize={gridSize}
                onChangeGridSize={onChangeGridSize}
                difficultyNum={difficultyNum}
                onChangeLevel={onChangeLevel}
                onChangeSound={onChangeSound}
                onChangeMusic={onChangeMusic}
                soundsVolume={soundsVolume}
                musicVolume={musicVolume}
                onChangeSoundsVolume={onChangeSoundsVolume}
                onChangeMusicVolume={onChangeMusicVolume}
              />
            )}
            {(state.hasWon || state.gameOver) && (
              <Popup
                theme={theme}
                show={true}
                onHide={onHidePopup}
                popup={popup}
              />
            )}
          </div>
        </Route>
      </div>
      <Footer />
    </div>
  );
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default App;
