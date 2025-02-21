import reactLogo from "./assets/react.svg";
import "./App.css";
import PaginatedTableContainer from "./containers/PaginatedTableContainer/PaginatedTableContainer";
import ThemeToggleButton from "./components/ThemeToggleButton/ThemeToggleButton";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="header-center">
          <img src={reactLogo} className="logo" alt="logo" />
          <h1>Table data with Pagination</h1>
        </div>
        <ThemeToggleButton />
      </header>
      <div className="components-container">
        <PaginatedTableContainer />
      </div>
    </div>
  );
}

export default App;
