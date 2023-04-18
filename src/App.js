import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css"
import NavbarWrapper from "./NavbarWrapper"
import Home from "./Home";
import Footer from "./Footer";
import Summary from "./Summary";
// import AboutUs from "./about";
import PageNotFound from "./PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <NavbarWrapper />
      <div className="App">
        <Routes>
          <Route exact path="/" Component={Home} />
        
        
          <Route exact path=":teamId/summary" Component={Summary} />
        
          {/* <Route exact path="/about" Component={AboutUs} /> */}
        
          <Route path="*" Component={PageNotFound} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;