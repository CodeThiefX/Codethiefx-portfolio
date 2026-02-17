import { create } from "zustand";
import { persist } from "zustand/middleware";

const useThemeStore = create(
  persist(
    (set, get) => ({
      isDarkMode: false,
      hasUserOverride: false,

      // Initialize based on system preference if no override
      initTheme: () => {
        const { hasUserOverride } = get();
        if (!hasUserOverride) {
          const systemDark = window.matchMedia(
            "(prefers-color-scheme: dark)",
          ).matches;
          set({ isDarkMode: systemDark });
        }

        // Listen for system changes
        window
          .matchMedia("(prefers-color-scheme: dark)")
          .addEventListener("change", (e) => {
            const { hasUserOverride } = get();
            if (!hasUserOverride) {
              set({ isDarkMode: e.matches });
            }
          });
      },

      toggleTheme: () =>
        set((state) => ({
          isDarkMode: !state.isDarkMode,
          hasUserOverride: true,
        })),

      setDarkMode: (value) => set({ isDarkMode: value, hasUserOverride: true }),
    }),
    {
      name: "portfolio-theme",
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
        hasUserOverride: state.hasUserOverride,
      }),
    },
  ),
);

export default useThemeStore;
