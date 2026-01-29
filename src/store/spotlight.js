import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useSpotlightStore = create(
  immer((set) => ({
    isOpen: false,
    searchQuery: "",

    openSpotlight: () =>
      set((state) => {
        state.isOpen = true;
        state.searchQuery = "";
      }),

    closeSpotlight: () =>
      set((state) => {
        state.isOpen = false;
        state.searchQuery = "";
      }),

    toggleSpotlight: () =>
      set((state) => {
        state.isOpen = !state.isOpen;
        if (!state.isOpen) {
          state.searchQuery = "";
        }
      }),

    setSearchQuery: (query) =>
      set((state) => {
        state.searchQuery = query;
      }),
  })),
);

export default useSpotlightStore;
