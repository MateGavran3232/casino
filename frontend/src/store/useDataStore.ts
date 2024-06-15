import axios from "axios";
import { create } from "zustand";
import { API_URL } from "../constants/appConstants";
import { GameData } from "../types";

interface DataState {
  data: GameData[] | [];
  singleGame: GameData | {};
  searchData: GameData[] | [];
  isLoggedIn: boolean;
  fetchData: {
    games: () => Promise<void>;
    singleGame: (id: string) => Promise<void>;
    search: (searchQuery: string) => Promise<void>;
  };
  handleLogin: ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => Promise<void>;
  handleLogout: () => void;
  resetSingleGame: () => void;
}

const useDataStore = create<DataState>((set) => ({
  data: [],
  isLoggedIn: false,
  singleGame: {},
  searchData: [],
  fetchData: {
    games: async () => {
      try {
        const response = await axios.get(`${API_URL}/games`);
        set({ data: response.data });
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    },
    singleGame: async (id: string) => {
      try {
        const response = await axios.get(`${API_URL}/games/${id}`);
        set({ singleGame: response.data });
      } catch (error) {
        console.error(`Error fetching single game with ID ${id}:`, error);
      }
    },
    search: async (searchQuery: string) => {
      try {
        const response = await axios.get(
          `${API_URL}/games?search=${searchQuery}`
        );
        set({ searchData: response.data });
      } catch (error) {
        console.error(
          `Error searching games with query "${searchQuery}":`,
          error
        );
      }
    },
  },
  handleLogin: async ({ username, password }) => {
    try {
      const response = await axios.post(`${API_URL}/users`, {
        username,
        password,
      });
      if (response.data !== "OK") {
        set({ isLoggedIn: false });
      } else {
        set({ isLoggedIn: true });
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  },
  handleLogout: () => {
    set({ isLoggedIn: false });
  },
  resetSingleGame: () => {
    set({ singleGame: {} });
  },
}));

export default useDataStore;
