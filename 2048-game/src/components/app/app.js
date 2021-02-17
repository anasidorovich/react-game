import React, { useState } from 'react';
import './app.css';
import Header from '../header';
import Footer from '../footer';
import GameHeading from '../game-heading';
import GridContainer from '../grid-container';
import GridItemContainer from '../grid-item-container';

function App() {
  const initialData = [Array.from({length: 4}, (_, i) => i + 1),
                        Array.from({length: 4}, (_, i) => i + 1),
                        Array.from({length: 4}, (_, i) => i + 1),
                        Array.from({length: 4}, (_, i) => i + 1)];

  const [data, setData] = useState(initialData);
  return (
    <div className="app mr-auto ml-auto">
      <Header />
      <GameHeading />
      <div className="game-container wrapper btn-primary text-uppercase mb-5">
        <GridContainer data={data}/>
        <GridItemContainer />
      </div>
      <Footer />
    </div>
  );
}

export default App;