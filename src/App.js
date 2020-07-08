import React from "react";
import ecotrain from "./ecotrain sur un pont.png";
import "./App.css";
// On définit une liste de règles publicodes
import résultat from "./Calcul.js";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Ecotrain</h1>
        <img src={ecotrain} className="App-logo" alt="logo" />
        <p>{résultat}</p>
      </header>
    </div>
  );
}

export default App;
