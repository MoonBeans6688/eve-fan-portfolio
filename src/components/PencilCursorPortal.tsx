import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface PencilCursorPortalProps {
  visible: boolean;
  x: number;
  y: number;
  imageSrc: string;
  width: number;
  height: number;
  tipX: number;
  tipY: number;
  scale?: number;
  angle?: number;
}

const PencilCursorPortal = ({
  visible,
  x,
  y,
  imageSrc,
  width,
  height,
  tipX,
  tipY,
  scale = 1,
  angle = 0,
}: PencilCursorPortalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!visible || !mounted || typeof document === "undefined") return null;

  return createPortal(
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width,
        height,
        pointerEvents: "none",
        zIndex: 999999,
        transform: `translate3d(${x - tipX}px, ${y - tipY}px, 0) scale(${scale}) rotate(${angle}deg)`,
        transformOrigin: "top left",
        willChange: "transform",
      }}
    >
      <img
        src={imageSrc}
        alt=""
        width={width}
        height={height}
        draggable={false}
        style={{ display: "block", width: "100%", height: "100%", userSelect: "none" }}
      />
    </div>,
    document.body
  );
};

export default PencilCursorPortal;
