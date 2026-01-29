import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Folder, Trash2, RefreshCw, Image, Info, Palette } from "lucide-react";

/**
 * Context menu state hook
 */
export const useContextMenu = () => {
  const [contextMenu, setContextMenu] = useState({
    isOpen: false,
    x: 0,
    y: 0,
    type: "desktop", // desktop, dock, finder
    data: null,
  });

  const openContextMenu = useCallback((e, type = "desktop", data = null) => {
    e.preventDefault();
    setContextMenu({
      isOpen: true,
      x: e.clientX,
      y: e.clientY,
      type,
      data,
    });
  }, []);

  const closeContextMenu = useCallback(() => {
    setContextMenu((prev) => ({ ...prev, isOpen: false }));
  }, []);

  // Close on any click
  useEffect(() => {
    const handleClick = () => closeContextMenu();
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [closeContextMenu]);

  return { contextMenu, openContextMenu, closeContextMenu };
};

/**
 * Context Menu Component
 */
const ContextMenu = ({ contextMenu, onAction }) => {
  const { isOpen, x, y, type } = contextMenu;

  const menuItems = {
    desktop: [
      // { id: "newFolder", label: "New Folder", icon: Folder },
      { id: "changeWallpaper", label: "Change Wallpaper", icon: Palette },
      { id: "divider", type: "divider" },
      // { id: "getInfo", label: "Get Info", icon: Info },
      { id: "refresh", label: "Refresh", icon: RefreshCw },
    ],
    dock: [
      { id: "open", label: "Open", icon: Folder },
      { id: "divider", type: "divider" },
      { id: "removeFromDock", label: "Remove from Dock", icon: Trash2 },
    ],
    finder: [
      { id: "open", label: "Open", icon: Folder },
      { id: "getInfo", label: "Get Info", icon: Info },
      { id: "divider", type: "divider" },
      { id: "delete", label: "Move to Trash", icon: Trash2 },
    ],
    image: [
      { id: "open", label: "Open", icon: Image },
      { id: "getInfo", label: "Get Info", icon: Info },
      { id: "copyPath", label: "Copy Path", icon: Folder },
    ],
  };

  const items = menuItems[type] || menuItems.desktop;

  // Adjust position to keep menu on screen
  const adjustedX = Math.min(x, window.innerWidth - 200);
  const adjustedY = Math.min(y, window.innerHeight - 300);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.1 }}
          className="fixed z-100000 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden py-1.5 min-w-48"
          style={{ left: adjustedX, top: adjustedY }}
          onClick={(e) => e.stopPropagation()}
        >
          {items.map((item, idx) =>
            item.type === "divider" ? (
              <div
                key={`divider-${idx}`}
                className="h-px bg-gray-200 dark:bg-gray-700 my-1.5"
              />
            ) : (
              <button
                key={item.id}
                onClick={() => onAction?.(item.id, contextMenu.data)}
                className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-blue-500 hover:text-white transition-colors text-sm text-gray-700 dark:text-gray-200 group"
              >
                <item.icon className="w-4 h-4 text-gray-400 group-hover:text-white" />
                {item.label}
              </button>
            ),
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContextMenu;
