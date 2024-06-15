export interface Data {
  games: Array<object>;
}

export interface DataContextProps {
  data: Data;
  setData: React.Dispatch<React.SetStateAction<Data>>;
}
export interface DataContextProviderProps {
  children: React.ReactNode;
}
