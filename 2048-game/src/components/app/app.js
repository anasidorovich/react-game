import React, { useState, useRef, useEffect } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import "./app.css";
import { useEvent } from "../../hooks";
import Header from "../header";
import Footer from "../footer";
import GameHeading from "../game-heading";
import GridContainer from "../grid-container";
import GridItemContainer from "../grid-item-container";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import GameOver from "./gameOver";
import WinPopup from "./winPopup";
import {
  initTiles,
  createNewTiles,
  move,
  directions,
  combine,
  getTileSize,
} from "../../helpers";

function App() {
  const GAME = {
    gridWidth: 500,
    gridMargin: 16,
    gridSize: 4,
    tileSize: 105,
    difficultyNum: 8,
    theme: "primary",
  };
  const themes = {
    primary: "https://bootswatch.com/4/pulse/bootstrap.min.css",
    dark: "https://bootswatch.com/4/lux/bootstrap.min.css",
  };

  const [difficultyNum, setDifficultyNum] = useState(GAME.difficultyNum);
  const [showPopup, setShowPopup] = useState(false);
  const [gridSize, setGridSize] = useState(GAME.gridSize);
  const [tileSize, setTileSize] = useState(GAME.tileSize);
  const handle = useFullScreenHandle();

  function getData() {
    return Array.from(new Array(gridSize), () =>
      Array.from(new Array(gridSize), () => 0)
    );
  }

  const [tiles, setTiles] = useState(() => {
    const initialState = initTiles(gridSize);
    return initialState;
  });

  const initState = {
    tiles: initTiles(gridSize),
    score: 0,
    gameOver: false,
    hasWon: false,
  };

  const [state, setState] = useState(initState);
  const [bestScore, setBestScore] = useState(0);

  const onHidePopup = () => setShowPopup(false);

  const onClickNewGame = () => {
    setState(initState);
  };

  const onChangeGridSize = (event) => {
    setGridSize(parseInt(event.target.value, 10));
  };

  const onClickAutoPlay = () => {
    setPlayable((prevPlayable) => !prevPlayable);
  };

  const onClickOptions = () => {
    document.getElementsByClassName("game-container")[0].requestFullScreen();
  };

  const [data, setData] = useState(getData());
  const [theme, setTheme] = useState(GAME.theme);
  const [playable, setPlayable] = useState(false);

  const onChangeTheme = (theme) => {
    setTheme(theme === "Cats" ? "dark" : "primary");
  };

  const handleKeyDown = async (event) => {
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
        const { score, tiles } = prevState;
        const { tiles: nextTiles, score: nextScore, hasWon } = combine(
          score,
          tiles,
          difficultyNum
        );
        const checkForGameOver =
          !hasWon && nextTiles.filter((tile) => tile !== 0).length === 0;
        return {
          ...prevState,
          score: nextScore,
          tiles: nextTiles,
          hasWon: hasWon,
          gameOver: checkForGameOver,
        };
      });

      setState((prevState) => {
        return {
          ...prevState,
          tiles: createNewTiles(prevState.tiles, gridSize),
        };
      });
    }
  };

  useEffect(() => {
    const { score } = state;
    if (score > bestScore) {
      setBestScore(score);
    }
  }, [state.score]);

  useEffect(() => {
    const { gameOver, hasWon } = state;
    if (gameOver) {
      setPlayable(false);
      setShowPopup(true);
    }
    if (hasWon) {
      setPlayable(false);
      setShowPopup(true);
    } else {
      onHidePopup();
    }
  }, [state.hasWon]);

  useEffect(() => {
    setTileSize(getTileSize(GAME.gridWidth, GAME.gridMargin, gridSize));
    setData(getData());
    setState(initState);
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

  const checkForWin = () => {
    //state.tiles.map(function(x) {return x.id; })
  };

  return (
    <ThemeSwitcherProvider defaultTheme="primary" themeMap={themes}>
      <div className={`app mr-auto ml-auto ${theme}`}>
        <Header onChangeTheme={onChangeTheme} onSizeSelect={onChangeGridSize} />
        <GameHeading
          score={state.score}
          bestScore={bestScore}
          onClickNewGame={onClickNewGame}
          onClickAutoPlay={onClickAutoPlay}
          onClickOptions={onClickOptions}
          playable={playable}
        />
        <FullScreen handle={handle}>
          <div
            className={`game-container wrapper bg-primary text-uppercase mb-5`}
          >
            {" "}
            <button
              type="button"
              class="btn fullscreen-btn btn-primary"
              onClick={handle.enter}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-fullscreen"
                viewBox="0 0 16 16"
              >
                <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"></path>
              </svg>
            </button>
            <GridContainer data={data} size={tileSize} />
            <GridItemContainer items={state.tiles} size={tileSize} />
          </div>
        </FullScreen>
        {showPopup && (
          <WinPopup theme={theme} show={showPopup} onHide={onHidePopup} />
        )}
        <Footer />
      </div>
    </ThemeSwitcherProvider>
  );
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default App;
