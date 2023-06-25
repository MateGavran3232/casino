import Navbar from "./component/Navbar";
import "./App.css";
import Main from "./component/Main";
import { DataContextProvider } from "./data/dataContext";

function App() {
  return (
    <DataContextProvider>
      <Navbar />
      <Main />
    </DataContextProvider>
  );
}

export default App;
