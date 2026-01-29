/**
 * Resize handles for window edges and corners
 * @param {Object} resizeHandleProps - Props for each resize handle direction
 * @param {boolean} isMaximized - Whether window is maximized (hide handles)
 */
const ResizeHandles = ({ resizeHandleProps, isMaximized }) => {
  if (isMaximized) return null;

  const handleStyle = {
    position: "absolute",
    zIndex: 10,
  };

  return (
    <>
      {/* Edge handles */}
      <div
        {...resizeHandleProps.n}
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
        {...resizeHandleProps.s}
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
        {...resizeHandleProps.e}
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
        {...resizeHandleProps.w}
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
        {...resizeHandleProps.nw}
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
        {...resizeHandleProps.ne}
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
        {...resizeHandleProps.sw}
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
        {...resizeHandleProps.se}
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

export default ResizeHandles;
