import { useContext } from "react";
import { DataContext } from "../data/dataContext";

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataContextProvider");
  }
  return context;
};
