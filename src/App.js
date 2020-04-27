import React from 'react';
import './App.css';
import AppBody from "./components/appBody";
import AppHeader from "./components/appHeader";

function App() {
  return (
    <div className="App">
      <AppHeader/>
      <AppBody/>
    </div>
  );
}

export default App;
