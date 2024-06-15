import axios from "axios";
import { create } from "zustand";
import { API_URL } from "../constants/appConstants";

interface DataState {
  data: any;
  singleGame: any;
  searchData: any;
  resetSingleGame: () => void;
  fetchGames: () => Promise<void>;
  fetchSingleGame: (id: string) => Promise<void>;
  fetchSearch: (searchQuery: string) => Promise<void>;
}

const useDataStore = create<DataState>((set) => ({
  data: [],
  singleGame: {},
  searchData: [],
  fetchGames: async () => {
    try {
      const response = await axios.get(API_URL);
      set({ data: response.data });
    } catch (e) {
      console.error(e);
    }
  },
  fetchSingleGame: async (id: string) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      set({ singleGame: response.data });
    } catch (e) {
      console.error(e);
    }
  },
  fetchSearch: async (searchQuery: string) => {
    try{
      const response = await axios.get(`${API_URL}?search=${searchQuery}`)
      set({searchData: response.data})
    } catch (e) {
      console.error(e)
    }
  },
  resetSingleGame: () => {
    set({ singleGame: {} });
  },
}));

export default useDataStore;
