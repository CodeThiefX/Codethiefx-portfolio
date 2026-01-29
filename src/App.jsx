import { useState, Suspense, useEffect } from "react";
import {
  Navbar,
  Welcome,
  Dock,
  MobileOverlay,
  Spotlight,
  BootScreen,
  ContextMenu,
  useContextMenu,
  NotificationCenter,
} from "#components";
import {
  Safari,
  Terminal,
  Resume,
  Finder,
  TextViewer,
  ImageViewer,
  Contact,
  Home,
  Gallery,
  Testimonials,
} from "#windows";
import { useKeyboardShortcuts } from "#hooks";
import useSpotlightStore from "#store/spotlight";
import useWindowStore from "#store/window";
import useThemeStore from "#store/theme";
import useWallpaperStore from "#store/wallpaper";

function App() {
  const { toggleSpotlight, closeSpotlight } = useSpotlightStore();
  const { closeWindow, minimizeWindow, windows } = useWindowStore();
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  const wallpaperStore = useWallpaperStore();
  const { contextMenu, openContextMenu } = useContextMenu();
  const [notificationCenterOpen, setNotificationCenterOpen] = useState(false);

  // Sync dark mode with DOM
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Find the topmost open window
  const getFocusedWindowKey = () => {
    let maxZ = 0;
    let focused = null;
    Object.entries(windows).forEach(([key, win]) => {
      if (win.isOpen && !win.isMinimized && win.zIndex > maxZ) {
        maxZ = win.zIndex;
        focused = key;
      }
    });
    return focused;
  };

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onSpotlight: toggleSpotlight,
    onCloseWindow: () => {
      const focused = getFocusedWindowKey();
      if (focused) closeWindow(focused);
    },
    onQuitWindow: () => {
      const focused = getFocusedWindowKey();
      if (focused) closeWindow(focused);
    },
    onMinimizeWindow: () => {
      const focused = getFocusedWindowKey();
      if (focused) minimizeWindow(focused);
    },
    onEscape: closeSpotlight,
    onToggleTheme: toggleDarkMode,
  });

  // Context menu actions
  const handleContextAction = (actionId) => {
    switch (actionId) {
      case "changeWallpaper":
        // Directly cycle wallpaper
        const { wallpapers, currentWallpaper, setWallpaper } =
          useWallpaperStore.getState();
        const currentIndex = wallpapers.findIndex(
          (w) => w.id === currentWallpaper.id,
        );
        const nextIndex = (currentIndex + 1) % wallpapers.length;
        setWallpaper(wallpapers[nextIndex].id);
        break;
      case "refresh":
        window.location.reload();
        break;
      case "openNotifications":
        setNotificationCenterOpen(true);
        break;
      default:
        console.log("Context action:", actionId);
    }
  };

  // Generate background style
  const getBackgroundStyle = () => {
    return {
      backgroundImage: `url('${wallpaperStore.currentWallpaper?.url || "/wallpapers/15-Sequoia-Dark-6K.jpg"}')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  };

  const [isLoaded, setIsLoaded] = useState(false);

  // Helper to track when Suspense content is ready
  const ContentReady = () => {
    useEffect(() => {
      setIsLoaded(true);
    }, []);
    return null;
  };

  return (
    <>
      <BootScreen isReady={isLoaded} />
      <main
        style={getBackgroundStyle()}
        onContextMenu={(e) => openContextMenu(e, "desktop")}
      >
        <MobileOverlay
          onContextMenu={(e) => openContextMenu(e, "desktop")}
          onOpenNotifications={() => setNotificationCenterOpen(true)}
        />
        <Navbar onNotificationClick={() => setNotificationCenterOpen(true)} />
        <Welcome />
        <Dock />
        <Spotlight />
        <ContextMenu contextMenu={contextMenu} onAction={handleContextAction} />
        <NotificationCenter
          isOpen={notificationCenterOpen}
          onClose={() => setNotificationCenterOpen(false)}
        />

        <Suspense fallback={null}>
          <ContentReady />
          <Safari />
          <Terminal />
          <Resume />
          <Finder />
          <TextViewer />
          <ImageViewer />
          <Gallery />
          <Testimonials />

          <Contact />
          <Home />
        </Suspense>
      </main>
    </>
  );
}

export default App;
