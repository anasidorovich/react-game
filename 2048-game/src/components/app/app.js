import React, { useState } from "react";
import "./app.css";
import Header from "../header";
import Footer from "../footer";
import GameHeading from "../game-heading";
import GridContainer from "../grid-container";
import GridItemContainer from "../grid-item-container";
import getItemPosition from "../../utils";

function App() {
  const [ gridSize, setGridSize ] = useState(4);
  const initialData = Array(gridSize).fill(Array.from({ length: gridSize }, (_, i) => i + 1));
  const initialItems = [getItemPosition(gridSize), getItemPosition(gridSize)];
  const [data, setData] = useState(initialData);
  const [items, setItems] = useState(initialItems);

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
  const t1 = new Tile(2, initialItems[0][0], initialItems[0][1]);
  const t2 = new Tile(4, initialItems[1][0], initialItems[1][1]);
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
  return (
    <div className="app mr-auto ml-auto">
      <Header />
      <GameHeading />
      <div className="game-container wrapper bg-primary text-uppercase mb-5">
        <GridContainer data={data} />
        <GridItemContainer items={tiles} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
