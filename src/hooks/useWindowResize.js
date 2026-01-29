import { useState, useCallback, useRef, useEffect } from "react";

// Minimum window dimensions
const MIN_WIDTH = 400;
const MIN_HEIGHT = 300;

/**
 * Hook for handling window resize via edge/corner dragging
 * @param {Object} initialSize - Initial { width, height } in pixels
 * @param {Object} initialPosition - Initial { x, y } position
 * @returns {Object} - Resize state and handlers
 */
const useWindowResize = (
  initialSize = { width: 800, height: 500 },
  initialPosition = { x: 100, y: 100 },
) => {
  const [size, setSize] = useState(initialSize);
  const [position, setPosition] = useState(initialPosition);
  const [isResizing, setIsResizing] = useState(false);

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
  const handleResizeMove = useCallback(
    (e) => {
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

      setSize({ width: newWidth, height: newHeight });
      setPosition({ x: newLeft, y: newTop });
    },
    [isResizing],
  );

  // Handle resize end
  const handleResizeEnd = useCallback(() => {
    setIsResizing(false);
  }, []);

  // Add/remove event listeners
  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleResizeMove);
      window.addEventListener("mouseup", handleResizeEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleResizeMove);
      window.removeEventListener("mouseup", handleResizeEnd);
    };
  }, [isResizing, handleResizeMove, handleResizeEnd]);

  return {
    size,
    position,
    setPosition,
    isResizing,
    handleResizeStart,
    resizeHandleProps: {
      n: { onMouseDown: (e) => handleResizeStart(e, "n") },
      s: { onMouseDown: (e) => handleResizeStart(e, "s") },
      e: { onMouseDown: (e) => handleResizeStart(e, "e") },
      w: { onMouseDown: (e) => handleResizeStart(e, "w") },
      ne: { onMouseDown: (e) => handleResizeStart(e, "ne") },
      nw: { onMouseDown: (e) => handleResizeStart(e, "nw") },
      se: { onMouseDown: (e) => handleResizeStart(e, "se") },
      sw: { onMouseDown: (e) => handleResizeStart(e, "sw") },
    },
  };
};

export default useWindowResize;
