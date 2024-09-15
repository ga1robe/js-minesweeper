import React from "react";
import Board from "./components/Board";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100 p-4">
      <Board />
    </div>
  );
};

export default App;
