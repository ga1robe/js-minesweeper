import React from 'react';
import logo from './logo.svg';
import Board from "./components/Board";
import './App.css';

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/

const App: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-blue-100">
      <Board />
    </div>
  );
};

export default App;
