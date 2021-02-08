import React from 'react';
import './App.css';
import AppBody from "./components/appBody";
import AppHeader from "./components/appHeader";
// import { v4 } from 'uuid'
// import ReactGA from 'react-ga';
// import auth from './auth.ts'; // Sample authentication provider

// const trackingId = "G-H2RVWR3NXD"; // Replace with your Google Analytics tracking ID
// ReactGA.initialize(trackingId);
// ReactGA.set({
//     userId: v4()
    // userId: auth.currentUserId(),
    // any data that is relevant to the user session
    // that you would like to track with google analytics
// });

function App() {
  return (
    <div className="App">
      <AppHeader/>
      <AppBody/>
    </div>
  );
}

export default App;
