import React, { useState, useEffect } from "react";
import { cloneDeep } from "lodash";
import "./app.css";
import { useEvent } from "../../hooks";
import Header from "../header";
import Footer from "../footer";
import GameHeading from "../game-heading";
import GridContainer from "../grid-container";
import GridItemContainer from "../grid-item-container";
import getItemPosition from "../../utils";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import { initTiles } from "./initTiles";

function App() {
  const themes = {
    primary: "https://bootswatch.com/4/pulse/bootstrap.min.css",
    dark: "https://bootswatch.com/4/lux/bootstrap.min.css",
  };

  const [gridSize, setGridSize] = useState(4);

  /* const initialData = Array(gridSize).fill(
    Array.from({ length: gridSize }, (_, i) => 0)
  );*/

  const initialData = Array.from(new Array(4), () =>
    Array.from(new Array(4), () => 0)
  );

  const newGame = {
    tiles: initTiles(gridSize),
    score: 0,
  };

  function getNewState() {
    return {
      tiles: initTiles(gridSize),
      score: 0,
    };
  }

  const [gameData, setGameData] = useState(getNewState());

  const onClickNewGame = () => {
    setGameData(getNewState());
  };

  const directions = {
    UP: "ArrowUp",
    DOWN: "ArrowDown",
    RIGHT: "ArrowRight",
    LEFT: "ArrowLeft",
  };

  gameData.tiles.map((tile) => {
    //initialData[tile.row][tile.col] = 2;
  });

  const [data, setData] = useState(initialData);
  const [theme, setTheme] = useState("primary");

  const onChangeTheme = (theme) => {
    if (theme === "Cats") {
      setTheme("dark");
    } else {
      setTheme("primary");
    }
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case directions.UP:
        moveUp();
        break;
      case directions.DOWN:
        moveDown();
        break;
      case directions.LEFT:
        moveLeft();
        break;
      case directions.RIGHT:
        moveRight();
        break;
      default:
        break;
    }
  };

  useEvent("keydown", handleKeyDown);

  const moveRight = () => {
    console.log(INITIAL_DATA2);
    for (let i = 0; i < gridSize; i++) {
      const row = INITIAL_DATA2[i];
      console.log("row");
      console.log(row);
      const filteredRow = row.filter((tile) => tile.value != 0);

      const zeros = Array(gridSize - filteredRow.length).fill(0);
      const newRow = zeros.concat(filteredRow);

      row.map((tile, ind) => {
        if (tile.column != i || newRow[ind] !== tile) {
          //const t = newRow[ind];
        }
        if (newRow[ind] === tile) {
        }
      });
      tiles[i].id = tiles[i].id + zeros.length;
      console.log("newrow=");
      console.log(newRow);
      //console.log(tile);
      INITIAL_DATA2[i] = newRow;
    }

    console.log(INITIAL_DATA2);
  };

  const moveLeft = () => {};

  const moveUp = () => {};

  const moveDown = () => {};

  return (
    <ThemeSwitcherProvider defaultTheme="primary" themeMap={themes}>
      <div className={`app mr-auto ml-auto ${theme}`}>
        <Header onChangeTheme={onChangeTheme} />
        <GameHeading onClickNewGame={onClickNewGame} />
        <div
          className={`game-container wrapper bg-primary text-uppercase mb-5`}
        >
          <GridContainer data={data} />
          <GridItemContainer items={gameData.tiles} />
        </div>
        <Footer />
      </div>
    </ThemeSwitcherProvider>
  );
}

export default App;
