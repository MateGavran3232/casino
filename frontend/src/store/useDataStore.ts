import axios, { isCancel } from "axios";
import { create } from "zustand";
import { API_URL } from "../constants/appConstants";
import { GameData, User } from "../types";
import { RegisterDataTypes } from "../component/auth/Register";

interface DataState {
  data: GameData[] | [];
  singleGame: GameData | {};
  searchData: GameData[] | [];
  user: User | null;
  isLoginOpen: boolean;
  isRegisterOpen: boolean;
  isLoggingLoading: boolean;
  isRegisteringLodaing: boolean;
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
  handleRegister: ({ username, email, password }: RegisterDataTypes) => void;
  handleLogout: () => void;
  actions: {
    setIsLoginOpen: (boolean: boolean) => void;
    setIsRegisterOpen: (boolean: boolean) => void;
    resetSingleGame: () => void;
  };
}

const useDataStore = create<DataState>((set, get) => ({
  data: [],
  singleGame: {},
  searchData: [],
  user: null,
  isLoginOpen: false,
  isRegisterOpen: false,
  isLoggingLoading: false,
  isRegisteringLodaing: false,
  isCachingPassword: false,
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
      set({ isLoggingLoading: true });
      const response = await axios.post(`${API_URL}/login`, {
        username,
        password,
      });
      if (response.data.length === 0) {
        set({ user: null });
        set({ isLoggingLoading: false });
      } else {
        const [user] = response.data;
        set({ isLoggingLoading: false });
        set({ user: user });
      }
    } catch (error) {
      console.error("Error logging in:", error);
    } finally {
      set({ isLoggingLoading: false });
      set({ isLoginOpen: false });
    }
  },
  handleLogout: () => {
    set({ user: null });
  },
  handleRegister: async ({ username, email, password }) => {
    try {
      set({ isRegisteringLodaing: true });
      const response = await axios.post(`${API_URL}/register`, {
        username,
        email,
        password,
      });
      if (response.data === "OK") {
        set({ isRegisteringLodaing: false });
        console.log("User added succesfully :D");
      } else {
        set({ isRegisteringLodaing: false });
        console.log("Failed to add user");
      }
    } catch (e) {
      console.error(e);
    } finally {
      set({ isRegisteringLodaing: false });
    }
  },
  actions: {
    resetSingleGame: () => {
      set({ singleGame: {} });
    },
    setIsLoginOpen: (boolean) => {
      set({ isLoginOpen: boolean });
    },
    setIsRegisterOpen: (boolean) => {
      set({ isRegisterOpen: boolean });
    },
  },
}));

export default useDataStore;
