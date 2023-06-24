import React, {
  useCallback,
  useEffect,
  useContext,
  createContext,
  useState,
} from "react";
import Navbar from "./component/Navbar";
import "./App.css";
import Main from "./component/Main";

interface Data {
  games: object[];
}

interface DataContextProps {
  data: Data;
  setData: React.Dispatch<React.SetStateAction<Data>>;
}

const initialData: Data = { games: [] };

const DataContext = createContext<DataContextProps | undefined>(undefined);

function App() {
  const [data, setData] = useState<Data>(initialData);

  const dataFetch = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3000/games");
      const data = await response.json();
      console.log(data);
      setData(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }, []);

  useEffect(() => {
    dataFetch();
  }, [dataFetch]);

  return (
    <DataContext.Provider value={{ data, setData }}>
      <Navbar />
      <Main />
    </DataContext.Provider>
  );
}

export default App;

export const useData = (): DataContextProps => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataContextProvider");
  }
  return context;
};
