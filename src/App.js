import React from "react";
import logo from "./logo.svg";
import "./App.css";
import résultat from "./Calcul.js";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Bonjour</p>
        <p>{résultat}</p>
      </header>
    </div>
  );
}

export default App;
