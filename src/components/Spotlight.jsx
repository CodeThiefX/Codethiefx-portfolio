import { useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Folder, Terminal, Mail, Globe, FileText } from "lucide-react";
import useSpotlightStore from "#store/spotlight";
import useWindowStore from "#store/window";
import { techStack, blogPosts, locations, socials } from "#constants";

// Build searchable index
const buildSearchIndex = () => {
  const items = [];

  // Add windows/apps
  items.push(
    {
      id: "finder",
      type: "app",
      name: "Portfolio",
      icon: Folder,
      windowKey: "finder",
    },
    {
      id: "safari",
      type: "app",
      name: "Articles",
      icon: Globe,
      windowKey: "safari",
    },
    {
      id: "terminal",
      type: "app",
      name: "Skills",
      icon: Terminal,
      windowKey: "terminal",
    },
    {
      id: "contact",
      type: "app",
      name: "Contact",
      icon: Mail,
      windowKey: "contact",
    },
    {
      id: "resume",
      type: "app",
      name: "Resume",
      icon: FileText,
      windowKey: "resume",
    },
  );

  // Add tech stack items
  techStack.forEach(({ category, items: techItems }) => {
    techItems.forEach((tech) => {
      items.push({
        id: `tech-${tech}`,
        type: "skill",
        name: tech,
        category,
        icon: Terminal,
        windowKey: "terminal",
      });
    });
  });

  // Add blog posts
  blogPosts.forEach((post) => {
    items.push({
      id: `blog-${post.id}`,
      type: "blog",
      name: post.title,
      date: post.date,
      icon: Globe,
      link: post.link,
    });
  });

  // Add projects from locations
  Object.values(locations || {}).forEach((location) => {
    if (location.children) {
      location.children.forEach((child) => {
        if (child.kind === "folder") {
          items.push({
            id: `project-${child.id}`,
            type: "project",
            name: child.name,
            icon: Folder,
            windowKey: "finder",
          });
        }
      });
    }
  });

  return items;
};

const Spotlight = () => {
  const { isOpen, searchQuery, closeSpotlight, setSearchQuery } =
    useSpotlightStore();
  const { openWindow } = useWindowStore();
  const inputRef = useRef(null);
  const searchIndex = useMemo(() => buildSearchIndex(), []);

  // Focus input when spotlight opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Close on escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        closeSpotlight();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeSpotlight]);

  // Filter results based on query
  const results = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return searchIndex
      .filter((item) => item.name.toLowerCase().includes(query))
      .slice(0, 8); // Limit to 8 results
  }, [searchQuery, searchIndex]);

  const handleSelect = (item) => {
    if (item.link) {
      window.open(item.link, "_blank", "noopener,noreferrer");
    } else if (item.windowKey) {
      openWindow(item.windowKey);
    }
    closeSpotlight();
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case "app":
        return "Application";
      case "skill":
        return "Skill";
      case "blog":
        return "Blog Post";
      case "project":
        return "Project";
      default:
        return type;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-99998 bg-black/40 backdrop-blur-sm"
            onClick={closeSpotlight}
          />

          {/* Spotlight Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 z-99999 w-[90%] max-w-xl"
          >
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-200/50 dark:border-gray-700/50">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects, skills, articles..."
                  className="flex-1 bg-transparent outline-none text-gray-800 dark:text-gray-100 placeholder:text-gray-400 text-lg"
                />
                <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 dark:bg-gray-700 rounded">
                  esc
                </kbd>
              </div>

              {/* Results */}
              {results.length > 0 && (
                <div className="max-h-80 overflow-y-auto p-2">
                  {results.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors text-left group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 dark:text-gray-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {getTypeLabel(item.type)}
                          {item.category && ` · ${item.category}`}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Empty State */}
              {searchQuery && results.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  <p>No results for "{searchQuery}"</p>
                </div>
              )}

              {/* Quick Actions (when no query) */}
              {!searchQuery && (
                <div className="p-4">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-3 px-2">
                    Quick Actions
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { name: "Portfolio", icon: Folder, key: "finder" },
                      { name: "Skills", icon: Terminal, key: "terminal" },
                      { name: "Contact", icon: Mail, key: "contact" },
                      { name: "Articles", icon: Globe, key: "safari" },
                    ].map((action) => (
                      <button
                        key={action.key}
                        onClick={() => {
                          openWindow(action.key);
                          closeSpotlight();
                        }}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <action.icon className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700 dark:text-gray-200">
                          {action.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Keyboard hint */}
            <p className="text-center text-xs text-white/60 mt-3">
              Press <kbd className="px-1.5 py-0.5 bg-white/10 rounded">⌘</kbd> +{" "}
              <kbd className="px-1.5 py-0.5 bg-white/10 rounded">Space</kbd> to
              toggle
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Spotlight;
