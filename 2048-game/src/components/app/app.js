import React, { useState, useEffect } from "react";
import { cloneDeep } from "lodash";
import "./app.css";
import { useEvent } from "../../hooks";
import Header from "../header";
import Footer from "../footer";
import GameHeading from "../game-heading";
import GridContainer from "../grid-container";
import GridItemContainer from "../grid-item-container";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import { initTiles, createNewTiles } from "./initTiles";
import { move, directions, removeAndIncreaseTiles } from "./move";

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

  const [data, setData] = useState(initialData);
  const [theme, setTheme] = useState("primary");

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
      const state = removeAndIncreaseTiles(score, prevTiles);
      setScore(state[1]);
      return state[0];
    });
    setTiles((prevTiles) => createNewTiles(prevTiles, gridSize));
  };

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
    }
  }, [score]);

  useEvent("keydown", handleKeyDown);

  return (
    <ThemeSwitcherProvider defaultTheme="primary" themeMap={themes}>
      <div className={`app mr-auto ml-auto ${theme}`}>
        <Header onChangeTheme={onChangeTheme} />
        <GameHeading
          onClickNewGame={onClickNewGame}
          score={score}
          bestScore={bestScore}
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
