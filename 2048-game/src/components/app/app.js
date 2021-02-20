import React, { useState, useEffect } from "react";
import "./app.css";
import { useEvent } from "../../hooks";
import Header from "../header";
import Footer from "../footer";
import GameHeading from "../game-heading";
import GridContainer from "../grid-container";
import GridItemContainer from "../grid-item-container";
import getItemPosition from "../../utils";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";

function App() {
  const themes = {
    primary: "https://bootswatch.com/4/pulse/bootstrap.min.css",
    dark: "https://bootswatch.com/4/lux/bootstrap.min.css",
  };

  const [gridSize, setGridSize] = useState(4);

  const initialData = Array(gridSize).fill(
    Array.from({ length: gridSize }, (_, i) => 0)
  );

  const directions = {
    UP: "ArrowUp",
    DOWN: "ArrowDown",
    RIGHT: "ArrowRight",
    LEFT: "ArrowLeft",
  };

  const initialItems = [getItemPosition(gridSize), getItemPosition(gridSize)];
  const [data, setData] = useState(initialData);
  const [items, setItems] = useState(initialItems);
  const [theme, setTheme] = useState("primary");

  const onChangeTheme = (theme) => {
    if (theme === "Cats") {
      setTheme("dark");
    } else {
      setTheme("primary");
    }
  };

  function Tile(value, row, column) {
    this.value = value || 0;
    this.row = row || -1;
    this.column = column || -1;
    this.oldRow = -1;
    this.oldColumn = -1;
    this.markForDeletion = false;
    this.mergedInto = null;
    this.id = Tile.id++;
  }

  Tile.id = 0;
  const t1 = new Tile(2, 3, 3);
  const t2 = new Tile(4, 3, 2);
  const t3 = new Tile(8, 1, 1);
  const t4 = new Tile(16, 1, 2);
  const t5 = new Tile(32, 1, 3);
  const t6 = new Tile(64, 1, 4);
  const t7 = new Tile(128, 2, 1);
  const t8 = new Tile(256, 2, 2);
  const t9 = new Tile(512, 2, 3);
  const t10 = new Tile(1024, 2, 4);
  const t11 = new Tile(2048, 3, 1);
  const tiles = [t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11];

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
    console.log(initialData);
  };

  const moveLeft = () => {};

  const moveUp = () => {};

  const moveDown = () => {};

  return (
    <ThemeSwitcherProvider defaultTheme="primary" themeMap={themes}>
      <div className={`app mr-auto ml-auto ${theme}`}>
        <Header onChangeTheme={onChangeTheme} />
        <GameHeading />
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

export default App;
