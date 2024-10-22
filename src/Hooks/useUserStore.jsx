// stores/useUserStore.jsx

import { create } from "zustand";
import { persist } from "zustand/middleware";
const useUserStore = create(
  persist((set) => ({
    user: null,

    setUser: (userData) => {
      set({ user: userData });
      localStorage.setItem("user", JSON.stringify(userData));
    },

    logout: () => {
      set({ user: null });
      localStorage.removeItem("user");
    },

    initializeUser: () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        set({ user: JSON.parse(storedUser) });
      }
    },
  }))
);

export default useUserStore;
