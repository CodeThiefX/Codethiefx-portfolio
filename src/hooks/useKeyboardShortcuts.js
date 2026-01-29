import { useEffect, useCallback } from "react";

/**
 * Custom hook for global keyboard shortcuts
 * macOS-style keyboard shortcuts for the portfolio
 */
const useKeyboardShortcuts = ({
  onSpotlight, // ⌘ + Space or Ctrl + Space
  onCloseWindow, // ⌘ + W or Ctrl + W
  onQuitWindow, // ⌘ + Q or Ctrl + Q
  onMinimizeWindow, // ⌘ + M or Ctrl + M
  onEscape, // Escape
  onToggleTheme, // ⌘ + D or Ctrl + D
}) => {
  const handleKeyDown = useCallback(
    (e) => {
      const isMeta = e.metaKey || e.ctrlKey;

      // Escape key
      if (e.key === "Escape") {
        e.preventDefault();
        onEscape?.();
        return;
      }

      // Meta/Ctrl combinations
      if (isMeta) {
        switch (e.key.toLowerCase()) {
          case " ":
            e.preventDefault();
            onSpotlight?.();
            break;
          case "w":
            e.preventDefault();
            onCloseWindow?.();
            break;
          case "q":
            e.preventDefault();
            onQuitWindow?.();
            break;
          case "m":
            e.preventDefault();
            onMinimizeWindow?.();
            break;
          case "d":
            e.preventDefault();
            onToggleTheme?.();
            break;
          default:
            break;
        }
      }
    },
    [
      onSpotlight,
      onCloseWindow,
      onQuitWindow,
      onMinimizeWindow,
      onEscape,
      onToggleTheme,
    ],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
};

export default useKeyboardShortcuts;
