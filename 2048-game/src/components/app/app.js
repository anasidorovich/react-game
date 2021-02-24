import React, { useState, useEffect } from "react";
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
        const nextState = combine(score, tiles, difficultyNum);
        const checkForGameOver =
          !nextState.hasWon &&
          nextState.tiles.filter((tile) => tile !== 0).length === 0;
        return {
          ...prevState,
          score: nextState.score,
          tiles: nextState.tiles,
          hasWon: nextState.hasWon,
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
        <div
          className={`game-container wrapper bg-primary text-uppercase mb-5`}
        >
          <GridContainer data={data} size={tileSize} />
          <GridItemContainer items={state.tiles} size={tileSize} />
        </div>
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
