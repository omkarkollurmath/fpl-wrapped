import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css"
import NavbarWrapper from "./NavbarWrapper"
import Home from "./Home";
import Footer from "./Footer";

function App() {
  return (
    <BrowserRouter>
      <NavbarWrapper />
      <div className="App">
        <Routes>
          <Route exact path="/" Component={Home} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;