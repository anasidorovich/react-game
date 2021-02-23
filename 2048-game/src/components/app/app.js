import React, { useState, useEffect } from "react";
import "./app.css";
import { useEvent } from "../../hooks";
import Header from "../header";
import Footer from "../footer";
import GameHeading from "../game-heading";
import GridContainer from "../grid-container";
import GridItemContainer from "../grid-item-container";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import { initTiles, createNewTiles } from "./initTiles";
import { move, directions, combine } from "./move";

function App() {
  const themes = {
    primary: "https://bootswatch.com/4/pulse/bootstrap.min.css",
    dark: "https://bootswatch.com/4/lux/bootstrap.min.css",
  };

  const [gridSize, setGridSize] = useState(4);
  const initialData = Array.from(new Array(gridSize), () =>
    Array.from(new Array(gridSize), () => 0)
  );
  const [tiles, setTiles] = useState(() => {
    const initialState = initTiles(gridSize);
    return initialState;
  });

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const onClickNewGame = () => {
    setTiles(initTiles(gridSize));
    setScore(0);
  };

  const onClickAutoPlay = () => {
    setPlayable(prevPlayable => !prevPlayable);
  };

  const [data, setData] = useState(initialData);
  const [theme, setTheme] = useState("primary");
  const [playable, setPlayable] = useState(false);

  const onChangeTheme = (theme) => {
    if (theme === "Cats") {
      setTheme("dark");
    } else {
      setTheme("primary");
    }
  };

  const handleKeyDown = async (event) => {
    if (Object.values(directions).includes(event.key)) {
      setTiles((prevTiles) => move(prevTiles, event.key, gridSize));
    }
    await delay(100);

    setTiles((prevTiles) => {
      const state = combine(score, prevTiles);
      setScore(state.score);
      return state.tiles;
    });
    setTiles((prevTiles) => createNewTiles(prevTiles, gridSize));
  };

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
    }
  }, [score]);

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
        <Header onChangeTheme={onChangeTheme} />
        <GameHeading
          score={score}
          bestScore={bestScore}
          onClickNewGame={onClickNewGame}
          onClickAutoPlay={onClickAutoPlay}
          playable={playable}
        />
        <div
          className={`game-container wrapper bg-primary text-uppercase mb-5`}
        >
          <GridContainer data={data} />
          <GridItemContainer items={tiles} />
        </div>
        <Footer />
      </div>
    </ThemeSwitcherProvider>
  );
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default App;
