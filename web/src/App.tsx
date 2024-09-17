import reactLogo from "./assets/react.svg";
import "./App.css";
import PaginatedTableContainer from "./containers/PaginatedTableContainer/PaginatedTableContainer";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={reactLogo} className="logo" alt="logo" />
        <h1>Table data with Pagination</h1>
      </header>
      <div className="components-container">
        <PaginatedTableContainer />
      </div>
    </div>
  );
}

export default App;
