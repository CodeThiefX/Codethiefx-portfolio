import dayjs from "dayjs";

import React, { useState, useEffect } from "react";
import { navLinks } from "#constants";
import useWindowStore from "#store/window";
import ThemeToggle from "./ThemeToggle";
import MenuBar from "./MenuBar";
import { Bell } from "lucide-react";

const Navbar = ({ onNotificationClick }) => {
  const { openWindow } = useWindowStore();
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [time, setTime] = useState(dayjs().format("ddd MMM D  h:mm A"));

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs().format("ddd MMM D  h:mm A"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // check whether screen size is mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      // Show navbar when cursor is within 10px of top
      if (e.clientY <= 10) {
        setIsVisible(true);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsVisible(false);
    }
  };

  return (
    <nav
      className={`relative sm:z-9999 ${!isMobile ? (isVisible ? "nav-visible" : "nav-hidden") : "fixed w-full"}`}
      onMouseLeave={handleMouseLeave}
    >
      <div>
        {/* Menu Bar with Apple menu and dropdowns */}
        <MenuBar />

        <ul>
          {navLinks.map(({ id, name, type }) => (
            <li key={id} onClick={() => openWindow(type)}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-2">
        {onNotificationClick && (
          <button
            onClick={onNotificationClick}
            className="p-1 hover:bg-white/10 rounded transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4 text-white/80 hover:text-white" />
          </button>
        )}
        <ThemeToggle />
        <time>{time}</time>
      </div>
    </nav>
  );
};

export default Navbar;
