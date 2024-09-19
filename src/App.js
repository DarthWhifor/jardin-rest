// import React, { useRef, useState } from "react";
// import './App.css';
// import {Route,Link} from "react-router-dom";
import React, { useRef, useState }  from "react";
import Jardin from "./components/Jardin";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/jardin" element={<Jardin />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
