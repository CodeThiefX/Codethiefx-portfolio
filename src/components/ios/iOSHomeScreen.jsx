import { useState } from "react";
import {
  Wifi,
  Signal,
  Bluetooth,
  Plane,
  Music,
  Lock,
  Cast,
  Sun,
  Moon,
  Flashlight,
  Calculator,
  Camera,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import IOSStatusBar from "./iOSStatusBar";
import IOSAppIcon from "./iOSAppIcon";
import IOSDock from "./iOSDock";
import { techStack, blogPosts, socials, locations } from "#constants";
import useWallpaperStore from "#store/wallpaper";
import useThemeStore from "#store/theme";

// iOS app configuration - maps to windows
const iosApps = [
  { id: "finder", name: "Portfolio", icon: "finder.png" },
  { id: "safari", name: "Articles", icon: "safari.png" },
  { id: "terminal", name: "Skills", icon: "terminal.png" },
  { id: "contact", name: "Contact", icon: "contact.png" },
];

// Dock apps (bottom 4)
const dockApps = [
  { id: "finder", name: "Portfolio", icon: "finder.png" },
  { id: "safari", name: "Articles", icon: "safari.png" },
  { id: "terminal", name: "Skills", icon: "terminal.png" },
  { id: "contact", name: "Contact", icon: "contact.png" },
];

const IOSControlCenter = ({ onClose }) => {
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  const { currentWallpaper } = useWallpaperStore();

  // Prevent click propagation
  const handleContentClick = (e) => e.stopPropagation();

  return (
    <div
      className="absolute inset-0 z-[100000] bg-black/10 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        exit={{ y: "-100%" }}
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
        className="absolute top-2 right-1/2 translate-x-1/2 p-4 w-[90%] max-w-[360px] 
                   bg-gray-200/40 dark:bg-gray-900/40 backdrop-blur-3xl 
                   rounded-[3rem] shadow-2xl border border-white/20"
        onClick={handleContentClick}
      >
        <div className="flex flex-col gap-4">
          {/* Top Row: Connectivity & Music */}
          <div className="grid grid-cols-2 gap-4 h-36">
            {/* Connectivity Grid */}
            <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-md rounded-[2rem] p-3 grid grid-cols-2 gap-2">
              <div className="flex flex-col items-center justify-center gap-1">
                <button className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white active:scale-90 transition-transform">
                  <Wifi className="w-5 h-5" />
                </button>
                <span className="text-[10px] font-medium text-gray-700 dark:text-gray-300">
                  Wi-Fi
                </span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1">
                <button className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white active:scale-90 transition-transform">
                  <Signal className="w-5 h-5" />
                </button>
                <span className="text-[10px] font-medium text-gray-700 dark:text-gray-300">
                  Cellular
                </span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1">
                <button className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white active:scale-90 transition-transform">
                  <Bluetooth className="w-5 h-5" />
                </button>
                <span className="text-[10px] font-medium text-gray-700 dark:text-gray-300">
                  Bluetooth
                </span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1">
                <button className="w-10 h-10 rounded-full bg-gray-400/50 flex items-center justify-center text-white active:scale-90 transition-transform">
                  <Plane className="w-5 h-5" />
                </button>
                <span className="text-[10px] font-medium text-gray-700 dark:text-gray-300">
                  Mode
                </span>
              </div>
            </div>

            {/* Music / Now Playing */}
            <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-md rounded-[2rem] p-4 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  Not Playing
                </p>
                <Music className="w-5 h-5 opacity-50 dark:text-white" />
              </div>
              <div className="flex justify-center items-center gap-3 mt-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[10px] border-l-gray-400 border-y-[6px] border-y-transparent ml-1"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Controls */}
          <div className="grid grid-cols-2 gap-4">
            {/* Lock Rotation */}
            <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-md rounded-[2rem] h-16 flex items-center gap-3 px-4 active:scale-95 transition-transform">
              <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-600 shadow flex items-center justify-center">
                <Lock className="w-4 h-4 text-red-500" />
              </div>
              <span className="text-sm font-medium dark:text-white">Lock</span>
            </div>

            {/* Screen Mirror */}
            <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-md rounded-[2rem] h-16 flex items-center gap-3 px-4 active:scale-95 transition-transform">
              <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-600 shadow flex items-center justify-center">
                <Cast className="w-4 h-4 text-gray-800 dark:text-white" />
              </div>
              <span className="text-sm font-medium dark:text-white">
                Mirror
              </span>
            </div>
          </div>

          {/* Row 3: Sliders */}
          <div className="grid grid-cols-2 gap-4">
            {/* Brightness */}
            <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-md rounded-[2rem] h-36 flex flex-col justify-end p-0 overflow-hidden relative group active:scale-95 transition-transform">
              <div className="absolute inset-0 bg-white/80 dark:bg-white/20 h-[60%] bottom-0 mt-auto w-full"></div>
              <div className="relative p-4 flex flex-col items-center gap-2 z-10 w-full mb-2">
                <Sun className="w-6 h-6 text-gray-800 dark:text-white" />
              </div>
            </div>

            {/* Volume */}
            <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-md rounded-[2rem] h-36 flex flex-col justify-end p-0 overflow-hidden relative active:scale-95 transition-transform">
              <div className="absolute inset-0 bg-white/80 dark:bg-white/20 h-[80%] bottom-0 mt-auto w-full"></div>
              <div className="relative p-4 flex flex-col items-center gap-2 z-10 w-full mb-2">
                {/* Volume Icon */}
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Row 4: Toggles */}
          <div className="grid grid-cols-4 gap-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`aspect-square rounded-full flex items-center justify-center transition-all active:scale-90 ${isDarkMode ? "bg-white text-black" : "bg-white/40 dark:bg-gray-800/40 text-gray-800 dark:text-white"}`}
            >
              {isDarkMode ? (
                <Moon className="w-6 h-6 fill-current" />
              ) : (
                <Sun className="w-6 h-6" />
              )}
            </button>

            <div className="aspect-square bg-white/40 dark:bg-gray-800/40 backdrop-blur-md rounded-full flex items-center justify-center active:scale-90 transition-transform">
              <Flashlight className="w-5 h-5 text-gray-800 dark:text-white" />
            </div>
            <div className="aspect-square bg-white/40 dark:bg-gray-800/40 backdrop-blur-md rounded-full flex items-center justify-center active:scale-90 transition-transform">
              <Calculator className="w-5 h-5 text-gray-800 dark:text-white" />
            </div>
            <div className="aspect-square bg-white/40 dark:bg-gray-800/40 backdrop-blur-md rounded-full flex items-center justify-center active:scale-90 transition-transform">
              <Camera className="w-5 h-5 text-gray-800 dark:text-white" />
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <div className="w-12 h-1 bg-gray-400/50 rounded-full" />
        </div>
      </motion.div>
    </div>
  );
};

// Simplified app content components for mobile
const IOSFinderContent = () => {
  const [navStack, setNavStack] = useState([]);

  // Current item (folder or file)
  const currentItem =
    navStack.length > 0 ? navStack[navStack.length - 1] : null;

  // If current item is a file (and not a folder with children or href), show preview
  if (currentItem && !currentItem.children && !currentItem.href) {
    const isImage =
      currentItem.fileType === "img" ||
      currentItem.name.match(/\.(png|jpg|jpeg|gif)$/i);
    const isText =
      currentItem.fileType === "txt" || currentItem.name.endsWith(".txt");

    return (
      <div className="p-4 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => setNavStack(navStack.slice(0, -1))}
            className="p-1 px-3 bg-gray-200 dark:bg-gray-700 rounded-lg text-sm font-medium text-blue-600 dark:text-blue-400"
          >
            Done
          </button>
          <span className="font-bold text-gray-800 dark:text-white truncate flex-1 text-center pr-12">
            {currentItem.name}
          </span>
        </div>

        <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden p-4">
          {isImage && (
            <img
              src={currentItem.imageUrl || currentItem.icon}
              alt={currentItem.name}
              className="w-full h-full object-contain"
            />
          )}
          {isText && (
            <div className="h-full overflow-y-auto font-mono text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
              {Array.isArray(currentItem.description)
                ? currentItem.description.join("\n\n")
                : currentItem.description || "No content"}
            </div>
          )}
          {!isImage && !isText && (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <img
                src={currentItem.icon}
                alt=""
                className="w-16 h-16 mb-4 opacity-50"
              />
              <p>Preview not available</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Folder View
  const currentItems = currentItem
    ? currentItem.children || []
    : Object.values(locations || {});

  const handleItemClick = (item) => {
    if (item.children) {
      setNavStack([...navStack, item]);
    } else if (item.href) {
      window.open(item.href, "_blank");
    } else {
      // It's a file, push to stack to trigger preview
      setNavStack([...navStack, item]);
    }
  };

  const handleBack = () => {
    setNavStack(navStack.slice(0, -1));
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        {navStack.length > 0 && (
          <button
            onClick={handleBack}
            className="p-1 px-2 bg-gray-200 dark:bg-gray-700 rounded text-sm font-medium text-blue-600 dark:text-blue-400"
          >
            Back
          </button>
        )}
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          {navStack.length === 0 ? "My Projects" : currentItem.name}
        </h2>
      </div>

      {navStack.length === 0 && (
        <p className="text-gray-500 text-sm">Tap a project to explore</p>
      )}

      <div className="space-y-3">
        {currentItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item)}
            className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 flex items-center gap-3 active:bg-gray-200 dark:active:bg-gray-700 transition-colors cursor-pointer"
          >
            <img
              src={item.icon}
              alt={item.name}
              className="w-10 h-10 object-contain"
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-800 dark:text-gray-200 truncate">
                {item.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {item.children
                  ? `${item.children.length} items`
                  : item.kind || "File"}
              </p>
            </div>
          </div>
        ))}
        {currentItems.length === 0 && (
          <p className="text-gray-400 text-center py-4">Empty folder</p>
        )}
      </div>
    </div>
  );
};

const IOSSafariContent = () => {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold text-pink-600">My Blog</h2>

      <div className="space-y-4">
        {blogPosts.map(({ id, date, title, image, link }) => (
          <a
            key={id}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-gray-50 rounded-xl overflow-hidden"
          >
            <img src={image} alt={title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <p className="text-xs text-gray-500">{date}</p>
              <h3 className="font-semibold text-gray-800 mt-1">{title}</h3>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

const IOSTerminalContent = () => {
  return (
    <div className="p-4 space-y-4 bg-gray-900 min-h-full">
      <div className="font-mono text-green-400 text-sm">
        <p>
          <span className="text-white font-bold">@CodeThief % </span>show tech
          stack
        </p>
      </div>

      <div className="space-y-4">
        {techStack.map(({ category, items }) => (
          <div key={category} className="border-b border-gray-700 pb-3">
            <p className="text-green-400 font-semibold font-mono text-sm">
              {category}
            </p>
            <p className="text-gray-300 font-mono text-xs mt-1">
              {items.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const IOSContactContent = () => {
  return (
    <div className="p-4 space-y-4">
      {/* Profile Header */}
      <div className="flex items-center gap-4">
        <img
          src="/images/codethief.png"
          alt="CodeThiefx"
          className="w-20 h-20 rounded-full object-cover ring-4 ring-blue-100"
        />
        <div>
          <h2 className="text-xl font-bold text-blue-800">Let's Connect</h2>
          <p className="text-gray-500 text-sm">Open for opportunities</p>
        </div>
      </div>

      {/* Email */}
      <a
        href="mailto:timiwade97@gmail.com"
        className="flex items-center gap-3 bg-blue-50 rounded-xl p-4"
      >
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </div>
        <div>
          <p className="text-xs text-gray-500">Email</p>
          <p className="font-semibold text-gray-800">timiwade97@gmail.com</p>
        </div>
      </a>

      {/* Social Links */}
      <div className="grid grid-cols-2 gap-3">
        {socials.map(({ id, bg, link, icon, text }) => (
          <a
            key={id}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl p-4 flex items-center gap-3"
            style={{ backgroundColor: bg }}
          >
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <img
                src={icon}
                alt={text}
                className="w-4 h-4 brightness-0 invert"
              />
            </div>
            <span className="text-white font-semibold text-sm">{text}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

// App content router
const IOSAppContent = ({ appId }) => {
  switch (appId) {
    case "finder":
      return <IOSFinderContent />;
    case "safari":
      return <IOSSafariContent />;
    case "terminal":
      return <IOSTerminalContent />;
    case "contact":
      return <IOSContactContent />;
    default:
      return <div className="p-4">App not found</div>;
  }
};

const IOSHomeScreen = ({ onContextMenu, onOpenNotifications }) => {
  const [activeApp, setActiveApp] = useState(null);
  const { currentWallpaper } = useWallpaperStore();
  const [touchStart, setTouchStart] = useState(null);
  const [controlCenterOpen, setControlCenterOpen] = useState(false);

  const handleAppClick = (app) => {
    setActiveApp(app.id);
  };

  const handleCloseApp = () => {
    setActiveApp(null);
  };

  // Swipe detection
  const handleTouchStart = (e) => {
    // Only track if no active app? Or always?
    if (!activeApp) setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    // Threshold 30px
    if (Math.abs(diff) > 30) {
      if (diff > 0) {
        // Swipe Left (Start > End) -> Open Notifications (Right Panel)
        onOpenNotifications?.();
      } else {
        // Swipe Right (Start < End) -> Open Control Center (Left Panel)
        setControlCenterOpen(true);
      }
    }
    setTouchStart(null);
  };

  return (
    <div
      className="sm:hidden fixed inset-0 z-99999 bg-linear-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden"
      onContextMenu={onContextMenu}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* iOS Wallpaper Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{
          backgroundImage: `url('${currentWallpaper?.url || "/images/wallpaper.png"}')`,
        }}
      />

      {/* Blur overlay for depth */}
      <div className="absolute inset-0 backdrop-blur-[1px]" />

      {/* Status Bar */}
      <IOSStatusBar />

      {/* Control Center Overlay */}
      <AnimatePresence>
        {controlCenterOpen && (
          <IOSControlCenter onClose={() => setControlCenterOpen(false)} />
        )}
      </AnimatePresence>

      {/* App Grid - Only show when no app is active */}
      <AnimatePresence>
        {!activeApp && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 px-6 pt-4"
          >
            {/* Search Bar */}
            <div className="mb-6">
              <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-2.5 flex items-center gap-3">
                <svg
                  className="w-4 h-4 text-white/60"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span className="text-white/60 text-sm">Search</span>
              </div>
            </div>

            {/* App Grid */}
            <div className="grid grid-cols-4 gap-y-6 gap-x-4 justify-items-center">
              {iosApps.map((app) => (
                <IOSAppIcon
                  key={app.id}
                  icon={`/images/${app.icon}`}
                  name={app.name}
                  onClick={() => handleAppClick(app)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active App Window - Full screen overlay */}
      <AnimatePresence>
        {activeApp && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-0 z-50 bg-white dark:bg-gray-900"
          >
            {/* App Header with close button */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={handleCloseApp}
                className="text-blue-500 font-medium text-sm flex items-center gap-1"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Home
              </button>
              <span className="font-semibold text-gray-800 dark:text-white">
                {iosApps.find((a) => a.id === activeApp)?.name || "App"}
              </span>
              <div className="w-16" /> {/* Spacer for centering */}
            </div>

            {/* App Content Area */}
            <div className="h-[calc(100%-56px)] overflow-y-auto">
              <IOSAppContent appId={activeApp} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dock - Only show when no app is active */}
      {!activeApp && <IOSDock apps={dockApps} onAppClick={handleAppClick} />}

      {/* Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/50 rounded-full" />
    </div>
  );
};

export default IOSHomeScreen;
