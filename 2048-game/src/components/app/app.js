import './app.css';
import Header from '../header';
import Footer from '../footer';
import GridContainer from '../grid-container';
import GridItemContainer from '../grid-item-container';

function App() {
  return (
    <div className="app mr-auto ml-auto">
      <Header />
      <div className="game-container wrapper btn-primary mb-5">
        <GridContainer />
        <GridItemContainer />
      </div>
      <Footer />
    </div>
  );
}

export default App;
