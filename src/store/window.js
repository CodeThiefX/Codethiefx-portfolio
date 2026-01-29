import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "#constants";

// Load initial state from localStorage if available
const loadPersistedState = () => {
  try {
    const saved = localStorage.getItem("window-state");
    if (saved) {
      const parsed = JSON.parse(saved);
      // Merge with WINDOW_CONFIG to ensure new windows are included
      const mergedWindows = { ...WINDOW_CONFIG };
      Object.keys(parsed.windows || {}).forEach((key) => {
        if (mergedWindows[key]) {
          mergedWindows[key] = {
            ...mergedWindows[key],
            ...parsed.windows[key],
            // Reset transient state on load
            isOpen: false,
            isMinimized: false,
          };
        }
      });
      return { windows: mergedWindows, nextZIndex: INITIAL_Z_INDEX + 1 };
    }
  } catch (e) {
    console.warn("Failed to load window state:", e);
  }
  return null;
};

const useWindowStore = create(
  subscribeWithSelector(
    immer(
      persist(
        (set, get) => ({
          windows: WINDOW_CONFIG,
          nextZIndex: INITIAL_Z_INDEX + 1,
          windowPositions: {}, // Store positions separately for persistence

          // FUNCTIONS USED TO MANAGE THE WINDOWS
          openWindow: (windowKey, data = null) =>
            set((state) => {
              const win = state.windows[windowKey];
              if (!win) return;
              win.isOpen = true;
              win.zIndex = state.nextZIndex;
              win.data = data ?? win.data;
              state.nextZIndex++;
            }),

          closeWindow: (windowKey) =>
            set((state) => {
              const win = state.windows[windowKey];
              if (!win) return;
              win.isOpen = false;
              win.isMinimized = false;
              win.isMaximized = false;
              win.zIndex = INITIAL_Z_INDEX;
              win.data = null;
            }),

          focusWindow: (windowKey) =>
            set((state) => {
              const win = state.windows[windowKey];
              if (!win) return;
              win.zIndex = state.nextZIndex++;
            }),

          minimizeWindow: (windowKey) =>
            set((state) => {
              const win = state.windows[windowKey];
              if (!win) return;
              win.isMinimized = true;
            }),

          restoreWindow: (windowKey) =>
            set((state) => {
              const win = state.windows[windowKey];
              if (!win) return;
              win.isMinimized = false;
              win.zIndex = state.nextZIndex++;
            }),

          toggleMaximize: (windowKey) =>
            set((state) => {
              const win = state.windows[windowKey];
              if (!win) return;
              win.isMaximized = !win.isMaximized;
            }),

          // Position management for persistence
          setWindowPosition: (windowKey, position) =>
            set((state) => {
              state.windowPositions[windowKey] = position;
            }),

          getWindowPosition: (windowKey) => {
            const state = get();
            return state.windowPositions[windowKey] || null;
          },

          // Bulk operations
          closeAllWindows: () =>
            set((state) => {
              Object.keys(state.windows).forEach((key) => {
                state.windows[key].isOpen = false;
                state.windows[key].isMinimized = false;
                state.windows[key].isMaximized = false;
                state.windows[key].zIndex = INITIAL_Z_INDEX;
                state.windows[key].data = null;
              });
            }),

          minimizeAllWindows: () =>
            set((state) => {
              Object.keys(state.windows).forEach((key) => {
                if (state.windows[key].isOpen) {
                  state.windows[key].isMinimized = true;
                }
              });
            }),
        }),
        {
          name: "window-state",
          partialize: (state) => ({
            windowPositions: state.windowPositions,
            // Don't persist isOpen, isMinimized, etc. - those reset on refresh
          }),
        },
      ),
    ),
  ),
);

export default useWindowStore;
