import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import dayjs from "dayjs";
import useWindowStore from "#store/window";
import useThemeStore from "#store/theme";
import useSpotlightStore from "#store/spotlight";

// Menu definitions
const menus = {
  apple: {
    label: "",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 170 170" fill="currentColor">
        <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.197-2.12-9.973-3.17-14.34-3.17-4.58 0-9.492 1.05-14.746 3.17-5.262 2.13-9.501 3.24-12.742 3.35-4.929.21-9.842-1.96-14.746-6.52-3.13-2.73-7.045-7.41-11.735-14.04-5.032-7.08-9.169-15.29-12.41-24.65-3.471-10.11-5.211-19.9-5.211-29.378 0-10.857 2.346-20.221 7.045-28.068 3.693-6.303 8.606-11.275 14.755-14.925s12.793-5.51 19.948-5.629c3.915 0 9.049 1.211 15.429 3.591 6.362 2.388 10.447 3.599 12.238 3.599 1.339 0 5.877-1.416 13.57-4.239 7.275-2.618 13.415-3.702 18.445-3.275 13.63 1.1 23.87 6.473 30.68 16.153-12.19 7.386-18.22 17.731-18.1 31.002.11 10.337 3.86 18.939 11.23 25.769 3.34 3.17 7.07 5.62 11.22 7.36-.9 2.61-1.85 5.11-2.86 7.51zM119.11 7.24c0 8.102-2.96 15.667-8.86 22.669-7.12 8.324-15.732 13.134-25.071 12.375-.119-.972-.188-1.995-.188-3.07 0-7.778 3.386-16.102 9.399-22.908 3.002-3.446 6.82-6.311 11.45-8.597 4.62-2.252 8.99-3.497 13.1-3.71.12 1.083.17 2.166.17 3.24z" />
      </svg>
    ),
    items: [
      { id: "about", label: "About CodeThiefx", action: "about" },
      { id: "divider1", type: "divider" },
      {
        id: "spotlight",
        label: "Spotlight",
        shortcut: "⌘ Space",
        action: "spotlight",
      },
      { id: "divider2", type: "divider" },
      { id: "refresh", label: "Refresh", shortcut: "⌘ R", action: "refresh" },
    ],
  },
  file: {
    label: "File",
    items: [
      {
        id: "portfolio",
        label: "Open Portfolio",
        shortcut: "⌘ 1",
        action: "finder",
      },
      { id: "resume", label: "Open Resume", shortcut: "⌘ 2", action: "resume" },
      { id: "divider1", type: "divider" },
      { id: "close", label: "Close Window", shortcut: "⌘ W", action: "close" },
    ],
  },
  view: {
    label: "View",
    items: [
      { id: "skills", label: "Skills", action: "terminal" },
      { id: "articles", label: "Articles", action: "safari" },
      { id: "contact", label: "Contact", action: "contact" },
      { id: "divider1", type: "divider" },
      {
        id: "theme",
        label: "Toggle Dark Mode",
        shortcut: "⌘ D",
        action: "theme",
      },
    ],
  },
  help: {
    label: "Help",
    items: [
      { id: "shortcuts", label: "Keyboard Shortcuts", action: "shortcuts" },
      { id: "divider1", type: "divider" },
      { id: "github", label: "View on GitHub", action: "github" },
    ],
  },
};

const MenuDropdown = ({ menu, isOpen, onToggle, onClose }) => {
  const dropdownRef = useRef(null);
  const { openWindow, closeWindow, windows } = useWindowStore();
  const { toggleDarkMode } = useThemeStore();
  const { openSpotlight } = useSpotlightStore();

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  const handleAction = (action) => {
    switch (action) {
      case "spotlight":
        openSpotlight();
        break;
      case "refresh":
        window.location.reload();
        break;
      case "close":
        // Close topmost window
        let maxZ = 0,
          topWindow = null;
        Object.entries(windows).forEach(([key, win]) => {
          if (win.isOpen && !win.isMinimized && win.zIndex > maxZ) {
            maxZ = win.zIndex;
            topWindow = key;
          }
        });
        if (topWindow) closeWindow(topWindow);
        break;
      case "theme":
        toggleDarkMode();
        break;
      case "github":
        window.open("https://github.com/CodeThiefX", "_blank");
        break;
      case "about":
        openWindow("contact");
        break;
      case "shortcuts":
        alert(
          "Keyboard Shortcuts:\n\n⌘+Space - Spotlight Search\n⌘+W - Close Window\n⌘+M - Minimize Window\n⌘+D - Toggle Dark Mode\nEsc - Close Dialogs",
        );
        break;
      default:
        if (
          ["finder", "safari", "terminal", "contact", "resume"].includes(action)
        ) {
          openWindow(action);
        }
    }
    onClose();
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={onToggle}
        className={`flex items-center gap-1 px-2 py-0.5 rounded text-sm transition-colors ${
          isOpen ? "bg-blue-500 text-white" : "hover:bg-gray-200/50"
        }`}
      >
        {menu.icon || menu.label}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.1 }}
            className="absolute top-full left-0 mt-1 px-1 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-lg shadow-xl border border-gray-200/50 dark:border-gray-700/50 min-w-64 py-1 z-9999"
          >
            {menu.items.map((item) =>
              item.type === "divider" ? (
                <div
                  key={item.id}
                  className="h-px bg-gray-200 dark:bg-gray-700 my-1"
                />
              ) : (
                <button
                  key={item.id}
                  onClick={() => handleAction(item.action)}
                  className="w-full flex items-center justify-between px-3 py-1.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-500 rounded-md hover:text-white transition-colors text-left whitespace-nowrap"
                >
                  <span>{item.label}</span>
                  {item.shortcut && (
                    <span className="text-xs text-gray-400 group-hover:text-blue-200">
                      {item.shortcut}
                    </span>
                  )}
                </button>
              ),
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MenuBar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [time, setTime] = useState(dayjs().format("ddd MMM D  h:mm A"));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs().format("ddd MMM D  h:mm A"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggle = (menuKey) => {
    setOpenMenu(openMenu === menuKey ? null : menuKey);
  };

  return (
    <div className="flex items-center gap-1">
      {Object.entries(menus).map(([key, menu]) => (
        <MenuDropdown
          key={key}
          menu={menu}
          isOpen={openMenu === key}
          onToggle={() => handleToggle(key)}
          onClose={() => setOpenMenu(null)}
        />
      ))}
    </div>
  );
};

export default MenuBar;
