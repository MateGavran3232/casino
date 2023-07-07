import React, { createContext, useState, useEffect, useCallback } from "react";
import { Data, DataContextProps, DataContextProviderProps } from "../types/api";
import { API_URL } from "../constants/appConstants";
const initialData: Data = { games: [] };

export const DataContext = createContext<DataContextProps>({
  data: initialData,
  setData: () => {
    throw new Error("setData function not implemented");
  },
});

export const DataContextProvider: React.FC<DataContextProviderProps> = ({
  children,
}) => {
  const [data, setData] = useState<Data>(initialData);

  const dataFetch = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}`);
      const data = await response.json();
      setData(data.games);
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
