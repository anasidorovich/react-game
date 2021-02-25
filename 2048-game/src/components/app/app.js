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
import styled from "styled-components";
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
    gridWidth: window.innerWidth > 520 ? 500 : 450,
    gridMargin: 16,
    gridSize: 4,
    tileSize: window.innerWidth > 520 ? 105 : 92.5,
    difficultyNum: 2048,
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
  const [tiles, setTiles] = useState(() => initTiles(gridSize));
  const handle = useFullScreenHandle();

  const getData = () => {
    return Array.from(new Array(gridSize), () =>
      Array.from(new Array(gridSize), () => 0)
    );
  };

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

  const onClickOptions = () => {};

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
        if (prevState.tiles.length === gridSize * gridSize) {
          return {
            ...prevState,
            gameOver: true,
          };
        }
        return {
          ...prevState,
          tiles: createNewTiles(prevState.tiles, gridSize),
        };
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
      setShowPopup(true);
    } else {
      onHidePopup();
    }
  }, [state.hasWon]);

  useEffect(() => {
    const { gameOver } = state;
    if (gameOver) {
      setPlayable(false);
      setShowPopup(true);
    } else {
      onHidePopup();
    }
  }, [state.gameOver]);

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
        <FullScreen handle={handle} className="mb-5">
          <div className={`game-container wrapper bg-primary text-uppercase`}>
            <button
              type="button"
              className="btn fullscreen-btn btn-primary"
              onClick={handle.enter}
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
        </FullScreen>
        {showPopup && (
          <WinPopup theme={theme} show={showPopup} onHide={onHidePopup} />
        )}
      </div>
      <Footer />
    </ThemeSwitcherProvider>
  );
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default App;

/*
const FullScreen = styled.div`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  max-width: ${({ size }) => size}px;
  @media (max-width: 500px) {
      width: 450px;
      height: 450px;
      max-width: 450px;
    }
`;
*/
