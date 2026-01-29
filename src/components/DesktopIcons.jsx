import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import useWindowStore from "#store/window";

const DesktopIcon = ({
  id,
  icon,
  name,
  position,
  onDragEnd,
  onDoubleClick,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      initial={position}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={(event, info) => {
        setIsDragging(false);
        onDragEnd(id, { x: info.point.x - 40, y: info.point.y - 40 });
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onDoubleClick={onDoubleClick}
      className={`absolute flex flex-col items-center gap-1 p-2 rounded-lg cursor-pointer
                 select-none transition-colors w-20
                 ${isDragging ? "z-50 opacity-80" : "z-10"}
                 hover:bg-white/10 active:bg-white/20`}
      style={{ touchAction: "none" }}
    >
      <div className="w-14 h-14 rounded-xl overflow-hidden shadow-lg bg-white/10 backdrop-blur-sm">
        <img
          src={icon}
          alt={name}
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>
      <span
        className="text-xs text-white text-center font-medium drop-shadow-md 
                       line-clamp-2 leading-tight"
      >
        {name}
      </span>
    </motion.div>
  );
};

// Default desktop icon positions
const getDefaultIconPositions = () => ({
  finder: { x: 30, y: 50 },
  terminal: { x: 30, y: 150 },
  safari: { x: 30, y: 250 },
  contact: { x: 30, y: 350 },
});

// Load saved positions from localStorage
const loadIconPositions = () => {
  try {
    const saved = localStorage.getItem("desktop-icon-positions");
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn("Failed to load icon positions:", e);
  }
  return getDefaultIconPositions();
};

// Save positions to localStorage
const saveIconPositions = (positions) => {
  try {
    localStorage.setItem("desktop-icon-positions", JSON.stringify(positions));
  } catch (e) {
    console.warn("Failed to save icon positions:", e);
  }
};

const DesktopIcons = () => {
  const { openWindow } = useWindowStore();
  const [iconPositions, setIconPositions] = useState(loadIconPositions);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const desktopIcons = [
    {
      id: "finder",
      name: "Portfolio",
      icon: "/images/finder.png",
      window: "finder",
    },
    {
      id: "terminal",
      name: "Skills",
      icon: "/images/terminal.png",
      window: "terminal",
    },
    {
      id: "safari",
      name: "Articles",
      icon: "/images/safari.png",
      window: "safari",
    },
    {
      id: "contact",
      name: "Contact",
      icon: "/images/contact.png",
      window: "contact",
    },
  ];

  const handleDragEnd = useCallback((id, newPosition) => {
    setIconPositions((prev) => {
      const updated = {
        ...prev,
        [id]: {
          x: Math.max(0, Math.min(window.innerWidth - 80, newPosition.x)),
          y: Math.max(50, Math.min(window.innerHeight - 100, newPosition.y)),
        },
      };
      saveIconPositions(updated);
      return updated;
    });
  }, []);

  const handleDoubleClick = useCallback(
    (windowKey) => {
      openWindow(windowKey);
    },
    [openWindow],
  );

  // Hide on mobile - iOS home screen handles this
  if (isMobile) {
    return null;
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-5">
      {desktopIcons.map((icon) => (
        <div key={icon.id} className="pointer-events-auto">
          <DesktopIcon
            id={icon.id}
            icon={icon.icon}
            name={icon.name}
            position={iconPositions[icon.id] || { x: 30, y: 50 }}
            onDragEnd={handleDragEnd}
            onDoubleClick={() => handleDoubleClick(icon.window)}
          />
        </div>
      ))}
    </div>
  );
};

export default DesktopIcons;
