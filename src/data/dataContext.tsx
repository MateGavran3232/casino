import React, { createContext, useState, useEffect, useCallback } from "react";

interface Data {
  games: Array<object>;
}

interface DataContextProps {
  data: Data;
  setData: React.Dispatch<React.SetStateAction<Data>>;
}

const initialData: Data = { games: [] };

export const DataContext = createContext<DataContextProps>({
  data: initialData,
  setData: () => {
    throw new Error("setData function not implemented");
  },
});

interface DataContextProviderProps {
  children: React.ReactNode;
}

export const DataContextProvider: React.FC<DataContextProviderProps> = ({
  children,
}) => {
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
      {children}
    </DataContext.Provider>
  );
};
