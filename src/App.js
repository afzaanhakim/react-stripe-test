import logo from "./logo.svg";
import "./App.css";
import Pay from "./components/Pay";
import Success from "./components/Success";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Router, Route, Routes } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/pay" element={<Pay />} />
      <Route exact path="/success" element={<Success />} />
    </Routes>
  );
}

export default App;
