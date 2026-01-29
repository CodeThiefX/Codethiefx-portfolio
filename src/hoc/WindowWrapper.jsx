import useWindowStore from "#store/window";
import useThemeStore from "#store/theme";

import { motion, useDragControls } from "framer-motion";
import { useGSAP } from "@gsap/react";
import {
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";

// Hook to detect mobile screen
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
};

// Minimum window dimensions
const MIN_WIDTH = 400;
const MIN_HEIGHT = 300;

// Resize handles component
const ResizeHandles = ({ onResizeStart, isMaximized }) => {
  if (isMaximized) return null;

  const handleStyle = {
    position: "absolute",
    zIndex: 10,
    touchAction: "none",
  };

  const handlePointerDown = (e) => {
    // Crucial: Stop propagation so window doesn't try to drag
    e.stopPropagation();
  };

  return (
    <>
      {/* Edge handles */}
      <div
        onMouseDown={(e) => onResizeStart(e, "n")}
        onPointerDown={handlePointerDown}
        style={{
          ...handleStyle,
          top: 0,
          left: 8,
          right: 8,
          height: 4,
          cursor: "ns-resize",
        }}
      />
      <div
        onMouseDown={(e) => onResizeStart(e, "s")}
        onPointerDown={handlePointerDown}
        style={{
          ...handleStyle,
          bottom: 0,
          left: 8,
          right: 8,
          height: 4,
          cursor: "ns-resize",
        }}
      />
      <div
        onMouseDown={(e) => onResizeStart(e, "e")}
        onPointerDown={handlePointerDown}
        style={{
          ...handleStyle,
          right: 0,
          top: 8,
          bottom: 8,
          width: 4,
          cursor: "ew-resize",
        }}
      />
      <div
        onMouseDown={(e) => onResizeStart(e, "w")}
        onPointerDown={handlePointerDown}
        style={{
          ...handleStyle,
          left: 0,
          top: 8,
          bottom: 8,
          width: 4,
          cursor: "ew-resize",
        }}
      />

      {/* Corner handles */}
      <div
        onMouseDown={(e) => onResizeStart(e, "nw")}
        onPointerDown={handlePointerDown}
        style={{
          ...handleStyle,
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          cursor: "nwse-resize",
        }}
      />
      <div
        onMouseDown={(e) => onResizeStart(e, "ne")}
        onPointerDown={handlePointerDown}
        style={{
          ...handleStyle,
          top: 0,
          right: 0,
          width: 8,
          height: 8,
          cursor: "nesw-resize",
        }}
      />
      <div
        onMouseDown={(e) => onResizeStart(e, "sw")}
        onPointerDown={handlePointerDown}
        style={{
          ...handleStyle,
          bottom: 0,
          left: 0,
          width: 8,
          height: 8,
          cursor: "nesw-resize",
        }}
      />
      <div
        onMouseDown={(e) => onResizeStart(e, "se")}
        onPointerDown={handlePointerDown}
        style={{
          ...handleStyle,
          bottom: 0,
          right: 0,
          width: 8,
          height: 8,
          cursor: "nwse-resize",
        }}
      />
    </>
  );
};

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows, getWindowPosition, setWindowPosition } =
      useWindowStore();
    const { isDarkMode } = useThemeStore();
    const isMobile = useIsMobile();
    const win = windows[windowKey];

    // Drag controls
    const dragControls = useDragControls();

    if (!win) {
      console.error(`WindowWrapper: Invalid windowKey "${windowKey}"`);
      return null;
    }
    const { isOpen, isMinimized, isMaximized, zIndex } = win;

    // On mobile, always treat as maximized
    const effectiveMaximized = isMobile || isMaximized;

    const ref = useRef(null);

    // Initial position logic
    const savedPos = getWindowPosition(windowKey);

    // Window size and position state
    // Use saved position if available, otherwise defaults
    // Don't set state directly from store in render to avoid loops, initialize once
    const [size, setSize] = useState({ width: 800, height: 500 });
    const [position, setPosition] = useState(savedPos || { x: 100, y: 80 });

    const [isResizing, setIsResizing] = useState(false);

    // Update position if store changes (optional, but good for sync)
    useEffect(() => {
      const currentSaved = getWindowPosition(windowKey);
      if (currentSaved) {
        setPosition(currentSaved);
      }
    }, [isOpen]); // Only sync on open/close to avoid fighting during drag

    const resizeRef = useRef({
      startX: 0,
      startY: 0,
      startWidth: 0,
      startHeight: 0,
      startLeft: 0,
      startTop: 0,
      direction: null,
    });

    // Handle resize start
    const handleResizeStart = useCallback(
      (e, direction) => {
        e.preventDefault();
        e.stopPropagation();

        setIsResizing(true);
        resizeRef.current = {
          startX: e.clientX,
          startY: e.clientY,
          startWidth: size.width,
          startHeight: size.height,
          startLeft: position.x,
          startTop: position.y,
          direction,
        };
      },
      [size, position],
    );

    // Handle mouse move during resize
    useEffect(() => {
      const handleResizeMove = (e) => {
        if (!isResizing) return;

        const {
          startX,
          startY,
          startWidth,
          startHeight,
          startLeft,
          startTop,
          direction,
        } = resizeRef.current;
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        let newWidth = startWidth;
        let newHeight = startHeight;
        let newLeft = startLeft;
        let newTop = startTop;

        // Handle horizontal resize
        if (direction.includes("e")) {
          newWidth = Math.max(MIN_WIDTH, startWidth + deltaX);
        }
        if (direction.includes("w")) {
          const possibleWidth = startWidth - deltaX;
          if (possibleWidth >= MIN_WIDTH) {
            newWidth = possibleWidth;
            newLeft = startLeft + deltaX;
          }
        }

        // Handle vertical resize
        if (direction.includes("s")) {
          newHeight = Math.max(MIN_HEIGHT, startHeight + deltaY);
        }
        if (direction.includes("n")) {
          const possibleHeight = startHeight - deltaY;
          if (possibleHeight >= MIN_HEIGHT) {
            newHeight = possibleHeight;
            newTop = startTop + deltaY;
          }
        }

        const newSize = { width: newWidth, height: newHeight };
        const newPos = { x: newLeft, y: newTop };

        setSize(newSize);
        setPosition(newPos);
      };

      const handleResizeEnd = () => {
        if (isResizing) {
          setIsResizing(false);
          // Save final state to store
          setWindowPosition(windowKey, position);
        }
      };

      if (isResizing) {
        window.addEventListener("mousemove", handleResizeMove);
        window.addEventListener("mouseup", handleResizeEnd);
      }

      return () => {
        window.removeEventListener("mousemove", handleResizeMove);
        window.removeEventListener("mouseup", handleResizeEnd);
      };
    }, [isResizing, position, windowKey, setWindowPosition]); // Added deps

    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;
      el.style.display = "block";
    }, [isOpen]);

    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;
      el.style.display = isOpen ? "block" : "none";
    }, [isOpen]);

    // Determine animation state
    const getAnimateState = () => {
      if (!isOpen) {
        return { scale: 0, opacity: 0, y: 40, x: 0 };
      }
      if (isMinimized) {
        return { scale: 0, opacity: 0, y: 100, x: 0 };
      }
      // Reset position to 0,0 when maximized to prevent overflow
      if (effectiveMaximized) {
        return { scale: 1, opacity: 1, y: 0, x: 0 };
      }
      return { scale: 1, opacity: 1, x: position.x, y: position.y };
    };

    // Handle drag end to update position correctly
    const handleDragEnd = (event, info) => {
      // If the drag offset is tiny (e.g. accidental click-move), ignore it?
      // But user might want small adjustments.
      // The main fix is preventing drag-during-resize which is handled by dragListener={false}
      const newPos = {
        x: position.x + info.offset.x,
        y: position.y + info.offset.y,
      };
      setPosition(newPos);
      setWindowPosition(windowKey, newPos);
    };

    const handlePointerDown = (e) => {
      if (!effectiveMaximized && !isResizing) {
        dragControls.start(e);
        focusWindow(windowKey);
      }
    };

    return (
      <motion.section
        initial={{ scale: 0.8, opacity: 0, y: 40 }}
        animate={getAnimateState()}
        transition={{ duration: isResizing ? 0 : 0.2, ease: "easeOut" }}
        drag={!effectiveMaximized} // Enable drag capability, but turn off auto-listener
        dragListener={false} // Disable default listener
        dragControls={dragControls}
        dragMomentum={false}
        dragElastic={0}
        onDragEnd={handleDragEnd}
        onPointerDown={handlePointerDown}
        id={windowKey}
        ref={ref}
        style={{
          zIndex,
          ...(effectiveMaximized
            ? {}
            : { width: size.width, height: size.height }),
        }}
        className={`absolute ${isDarkMode ? "dark" : ""} ${
          effectiveMaximized
            ? "top-0 left-0 w-screen! h-screen! max-w-none max-h-none overflow-hidden"
            : "overflow-auto rounded-xl shadow-2xl"
        }`}
      >
        <ResizeHandles
          onResizeStart={handleResizeStart}
          isMaximized={effectiveMaximized}
        />
        <Component
          {...props}
          isMaximized={effectiveMaximized}
          isMobile={isMobile}
        />
      </motion.section>
    );
  };

  Wrapped.displayName = `windowWrapper(${Component.displayName || Component.name || "Component"})`;

  return Wrapped;
};

export default WindowWrapper;
