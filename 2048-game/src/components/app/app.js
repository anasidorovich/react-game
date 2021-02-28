import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
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
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
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
  FULLSCREEN,
  THEMES,
  winPopup,
  gameOverPopup,
} from "../../constants";
import OptionsPopup from "./options";
import { AboutPage, StatsPage } from "../pages";

function App() {
  const [difficultyNum, setDifficultyNum] = useLocalStorage(
    "2048GameLevel",
    GAME.difficultyNum
  );
  const [showPopup, setShowPopup] = useState(false);
  const [gridSize, setGridSize] = useLocalStorage(
    "2048GameSize",
    GAME.gridSize
  );
  const [tileSize, setTileSize] = useLocalStorage(
    "2048GameTileSize",
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
  const [bestScore, setBestScore] = useLocalStorage("2048gamaBestScore", 0);
  const [popup, setPopup] = useState(gameOverPopup);
  const [showOptions, setShowOptions] = useState(false);

  const onHidePopup = () => {
    setState(initState);
  };

  const saveTiles = (state) => {
    if (!playable) {
      const localStore = cloneDeep(state);
      localStore.tiles.forEach((tile) => {
        delete tile.merged;
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
    console.log("show");
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
  const [theme, setTheme] = useLocalStorage("2048gamaTheme", GAME.theme);
  const [playable, setPlayable] = useState(false);

  const onChangeTheme = (theme) => {
    setTheme(theme === "Lux" ? "dark" : "primary");
  };

  const handleKeyDown = async (event) => {
    event.preventDefault();
    if (
      !state.hasWon &&
      !state.gameOver &&
      Object.values(directions).includes(event.key)
    ) {
      setState((prevState) => {
        return {
          ...prevState,
          tiles: move(prevState.tiles, event.key, gridSize),
        };
      });
      await delay(100);

      setState((prevState) => {
        const { tiles, score, hasWon } = combine(
          prevState.score,
          prevState.tiles,
          difficultyNum
        );
        return {
          ...prevState,
          score: score,
          tiles: tiles,
          hasWon: hasWon,
        };
      });

      setState((prevState) => {
        let nextState;
        if (prevState.tiles.length === gridSize * gridSize) {
          nextState = {
            ...prevState,
            gameOver: true,
          };
        } else {
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
    }
  }, [state.hasWon]);

  useEffect(() => {
    console.log(popup);
  }, [popup]);

  useEffect(() => {
    const { gameOver } = state;
    if (gameOver) {
      setPlayable(false);
      saveTiles(state);
      setPopup(gameOverPopup);
    }
  }, [state.gameOver]);

  useEffect(() => {
    setTileSize(getTileSize(GAME.gridWidth, GAME.gridMargin, gridSize));
    setData(getData);
    setState(getLocalStorage(getStorageStateName()) || initState);
  }, [gridSize]);

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

  return (
    <ThemeSwitcherProvider defaultTheme={theme} themeMap={THEMES}>
      <div className={`app mr-auto ml-auto ${theme}`}>
        <Router>
          <Header
            onChangeTheme={onChangeTheme}
            onSizeSelect={onChangeGridSize}
            gridSize={gridSize}
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
              <div className="game-container wrapper bg-primary text-uppercase mt-3 mb-5">
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
                  onClickClose={onCloseOptions}
                  gridSize={gridSize}
                  onChangeGridSize={onChangeGridSize}
                  difficultyNum={difficultyNum}
                  onChangeLevel={onChangeLevel}
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
        </Router>
      </div>

      <Footer />
    </ThemeSwitcherProvider>
  );
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default App;
