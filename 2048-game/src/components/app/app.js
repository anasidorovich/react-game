import './app.css';
import Header from '../header';
import Footer from '../footer';
import GameHeading from '../game-heading';
import GridContainer from '../grid-container';
import GridItemContainer from '../grid-item-container';

function App() {
  return (
    <div className="app mr-auto ml-auto">
      <Header />
      <GameHeading />
      <div className="game-container wrapper btn-primary text-uppercase mb-5">
        <GridContainer />
        <GridItemContainer />
      </div>
      <Footer />
    </div>
  );
}

export default App;