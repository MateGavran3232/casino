import axios from "axios";
import { create } from "zustand";
import { API_URL } from "../constants/appConstants";
import { GameData, User } from "../types";
import { RegisterDataTypes } from "../component/auth/Register";
import { handleFetch } from "../lib/lib";

interface DataState {
  data: GameData[] | [];
  singleGame: GameData | {};
  searchData: GameData[] | [];
  user: User | null;
  isLoginOpen: boolean;
  isRegisterOpen: boolean;
  isLoggingLoading: boolean;
  isRegisteringLodaing: boolean;
  toasts: {
    id: number;
    toastType: "success" | "error" | "";
    toastMessage: string;
    isToastOpen: boolean;
  }[];
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
    openToast: (type: "success" | "error" | "", message: string) => void;
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
  toasts: [],
  fetchData: {
    games: async () => {
      const data = await handleFetch<GameData[]>({
        url: `${API_URL}/games`,
        method: "GET",
      });
      set({ data: data });
    },
    singleGame: async (id: string) => {
      const data = await handleFetch<GameData>({
        url: `${API_URL}/games/${id}`,
        method: "GET",
      });
      set({ singleGame: data });
    },
    search: async (searchQuery: string) => {
      const data = await handleFetch<GameData[]>({
        url: `${API_URL}/games?search=${searchQuery}`,
        method: "GET",
      });
      set({ searchData: data });
    },
  },
  handleLogin: async ({ username, password }) => {
    set({ isLoggingLoading: true });
    const data = await handleFetch<User[]>({
      url: `${API_URL}/login`,
      method: "POST",
      body: {
        username,
        password,
      },
    });
    if (data?.length === 0) {
      set({ user: null });
      set({ isLoggingLoading: false });
      get().actions.openToast("error", "Error Logging in D:");
    } else {
      const [user] = data;
      set({ isLoggingLoading: false });
      set({ user: user });
      get().actions.openToast("success", "Success Logging In :D");
    }
    set({ isLoggingLoading: false });
    set({ isLoginOpen: false });
  },
  handleLogout: () => {
    set({ user: null });
    get().actions.openToast("success", "You have logged out!");
  },
  handleRegister: async ({ username, email, password }) => {
    set({ isRegisteringLodaing: true });
    const data = await handleFetch({
      url: `${API_URL}/register`,
      method: "POST",
      body: {
        username,
        email,
        password,
      },
    });
    if (data === "OK") {
      set({ isRegisteringLodaing: false });
      get().actions.openToast("success", "Your account has been created!");
    } else {
      set({ isRegisteringLodaing: false });
      get().actions.openToast("error", "Error creating account!");
    }

    set({ isRegisteringLodaing: false });
  },
  actions: {
    resetSingleGame: () => {
      set({ singleGame: {} });
    },
    setIsLoginOpen: (isOpen) => {
      set({ isLoginOpen: isOpen });
    },
    setIsRegisterOpen: (isOpen) => {
      set({ isRegisterOpen: isOpen });
    },
    openToast: (type, message) => {
      const newToast = {
        id: Date.now(),
        toastType: type,
        isToastOpen: true,
        toastMessage: message,
      };

      set({ toasts: [...get().toasts, newToast] });

      setTimeout(() => {
        set({
          toasts: get().toasts.map((toast) =>
            toast.id === newToast.id ? { ...toast, isToastOpen: false } : toast
          ),
        });
        setTimeout(() => {
          set({
            toasts: get().toasts.filter((toast) => toast.id !== newToast.id),
          });
        }, 500);
      }, 5000);
    },
  },
}));

export default useDataStore;
