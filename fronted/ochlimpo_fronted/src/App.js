import React from "react";
import MainPage from "./components/MainPage.js";
import SecondPage from "./components/SecondPage.js";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      {/* Main Page */}
      <MainPage />
      
      {/* Second Page */}
      <SecondPage />
    </div>
  );
}

export default App;
