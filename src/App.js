import React from 'react';
import './App.css';
import AppBody from "./components/appBody";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Project Manabase</h1>
          <h4><a href="https://twitter.com/wickedfridge">By Charles Wickham</a></h4>
      </header>
      <AppBody/>
    </div>
  );
}

export default App;
