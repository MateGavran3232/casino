import Navbar from "./component/layout/Navbar";
import "./App.css";
import Main from "./component/layout/Main";
import GameDetailes from "./component/game/GameDetailes";
import { DataContextProvider } from "./data/dataContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllGames from "./pages/AllGames";
import Footer from "./component/layout/Footer";
function App() {
  return (
    <BrowserRouter>
      <DataContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/games/:id" element={<GameDetailes />} />
          <Route path="/allgames" element={<AllGames />} />
        </Routes>
        <Footer />
      </DataContextProvider>
    </BrowserRouter>
  );
}

export default App;
