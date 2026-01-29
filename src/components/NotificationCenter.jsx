import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Bell,
  Calendar,
  Code,
  Briefcase,
  Star,
  ChevronRight,
} from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

// Sample notifications data
const initialNotifications = [
  {
    id: 1,
    app: "Portfolio",
    icon: <Briefcase className="w-4 h-4" />,
    title: "New Project Added",
    message: "Check out my latest project - SurgeChain DeFi Platform",
    time: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
    color: "bg-blue-500",
  },
  {
    id: 2,
    app: "Skills",
    icon: <Code className="w-4 h-4" />,
    title: "Skills Updated",
    message: "Added TypeScript, Flutter, and more to my tech stack",
    time: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    color: "bg-green-500",
  },
  {
    id: 3,
    app: "Blog",
    icon: <Star className="w-4 h-4" />,
    title: "New Article Published",
    message: "The Ultimate Guide to Flutter for Mobile Development",
    time: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    color: "bg-purple-500",
  },
  {
    id: 4,
    app: "Calendar",
    icon: <Calendar className="w-4 h-4" />,
    title: "Available for Work",
    message: "Open to new opportunities and collaborations",
    time: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    color: "bg-orange-500",
  },
];

const NotificationCenter = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [doNotDisturb, setDoNotDisturb] = useState(false);

  const clearNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100001]"
          />

          {/* Notification Panel */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-2 left-2 right-2 bottom-2 md:top-7 md:right-2 md:left-auto md:bottom-2 md:w-80 z-[100002] 
                      bg-white/20 md:bg-white/60 dark:bg-gray-900/60 backdrop-blur-2xl
                       rounded-3xl shadow-2xl border border-white/20
                       flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200/20 dark:border-gray-700/20">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  <h2 className="font-semibold text-gray-800 dark:text-white">
                    Notifications
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-1 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-700/50 
                           transition-colors"
                >
                  <X className="w-4 h-4 text-white md:text-gray-500" />
                </button>
              </div>

              {/* Do Not Disturb Toggle */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Do Not Disturb
                </span>
                <button
                  onClick={() => setDoNotDisturb(!doNotDisturb)}
                  className={`relative w-10 h-6 rounded-full transition-colors ${
                    doNotDisturb
                      ? "bg-purple-500"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  <motion.div
                    animate={{ x: doNotDisturb ? 16 : 2 }}
                    className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
                  />
                </button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto p-2">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <Bell className="w-12 h-12 mb-3 opacity-30" />
                  <p className="text-sm">No new notifications</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <AnimatePresence>
                    {notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100, height: 0 }}
                        className="group bg-white/60 dark:bg-gray-800/60 rounded-lg p-3
                                 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-colors
                                 cursor-pointer relative"
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            clearNotification(notification.id);
                          }}
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100
                                   p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700
                                   transition-all"
                        >
                          <X className="w-3 h-3 text-gray-400" />
                        </button>

                        <div className="flex gap-3">
                          {/* App Icon */}
                          <div
                            className={`w-8 h-8 rounded-lg ${notification.color} 
                                      flex items-center justify-center text-white shrink-0`}
                          >
                            {notification.icon}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-0.5">
                              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                                {notification.app}
                              </span>
                              <span className="text-xs text-gray-400">
                                {dayjs(notification.time).fromNow()}
                              </span>
                            </div>
                            <h3 className="text-sm font-medium text-gray-800 dark:text-white truncate">
                              {notification.title}
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                              {notification.message}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-gray-200/50 dark:border-gray-700/50">
                <button
                  onClick={clearAll}
                  className="w-full py-2 text-sm text-gray-500 dark:text-gray-400
                           hover:text-gray-700 dark:hover:text-gray-200 transition-colors
                           flex items-center justify-center gap-1"
                >
                  Clear All
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Widget Section */}
            <div className="p-3 border-t border-gray-200/50 dark:border-gray-700/50">
              {/* Current Date Widget */}
              <div className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-3 mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-500 rounded-lg flex flex-col items-center justify-center text-white">
                    <span className="text-xs uppercase">
                      {dayjs().format("MMM")}
                    </span>
                    <span className="text-lg font-bold leading-none">
                      {dayjs().format("D")}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">
                      {dayjs().format("dddd")}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {dayjs().format("MMMM D, YYYY")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Weather-like status */}
              <div className="bg-linear-to-br from-blue-500 to-purple-600 rounded-lg p-3 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs opacity-80">Status</p>
                    <p className="text-lg font-semibold">Available</p>
                    <p className="text-xs opacity-80">Open to opportunities</p>
                  </div>
                  <div className="text-4xl">✨</div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationCenter;
