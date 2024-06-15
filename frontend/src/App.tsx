import Navbar from "./component/layout/Navbar";
import "./App.css";
import Main from "./component/layout/Main";
import GameDetailes from "./component/game/GameDetailes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllGames from "./pages/AllGames";
import Footer from "./component/layout/Footer";
import ScrollToTopOnRouteChange from "./component/utils/ScrollToTopOnRouteChange";
import React from "react";
function App() {
  return (
    <BrowserRouter>
      <ScrollToTopOnRouteChange />
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/games/:id" element={<GameDetailes />} />
        <Route path="/allgames" element={<AllGames />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
