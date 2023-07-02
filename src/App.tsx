import Navbar from "./component/Navbar";
import "./App.css";
import Main from "./component/Main";
import GameDetailes from "./component/GameDetailes";
import { DataContextProvider } from "./data/dataContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllGames from "./component/AllGames";
import Footer from "./component/Footer";
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
