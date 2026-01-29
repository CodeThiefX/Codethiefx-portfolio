import { create } from "zustand";
import { persist } from "zustand/middleware";

const wallpapers = [
  {
    id: "sequoia-dark",
    url: "/wallpapers/15-Sequoia-Dark-6K.jpg",
    name: "Sequoia Dark",
  },
  {
    id: "sequoia-sunrise",
    url: "/wallpapers/15-Sequoia-Sunrise.png",
    name: "Sequoia Sunrise",
  },
  {
    id: "sequoia-light",
    url: "/wallpapers/15-Sequoia-Light-6K.jpg",
    name: "Sequoia Light",
  },
  {
    id: "tahoe-day",
    url: "/wallpapers/26-Tahoe-Beach-Day.png",
    name: "Tahoe Day",
  },
  {
    id: "tahoe-dawn",
    url: "/wallpapers/26-Tahoe-Beach-Dawn.png",
    name: "Tahoe Dawn",
  },
  {
    id: "tahoe-dusk",
    url: "/wallpapers/26-Tahoe-Beach-Dusk.png",
    name: "Tahoe Dusk",
  },
];

const useWallpaperStore = create(
  persist(
    (set) => ({
      wallpapers,
      currentWallpaper: wallpapers[0],

      setWallpaper: (wallpaperId) =>
        set((state) => {
          const wp = state.wallpapers.find((w) => w.id === wallpaperId);
          if (wp) {
            return { currentWallpaper: wp };
          }
          return state;
        }),
    }),
    {
      name: "portfolio-wallpaper-v2", // New key to avoid old data conflicts
    },
  ),
);

export default useWallpaperStore;
