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

const CURSOR_LAYER_ID = "cursor-layer";

const ensureCursorLayer = () => {
  let layer = document.getElementById(CURSOR_LAYER_ID);

  if (!layer) {
    layer = document.createElement("div");
    layer.id = CURSOR_LAYER_ID;
    Object.assign(layer.style, {
      position: "fixed",
      inset: "0",
      pointerEvents: "none",
      zIndex: "999999",
    });
    document.body.appendChild(layer);
  }

  return layer;
};

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
  const [layer, setLayer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setLayer(ensureCursorLayer());
  }, []);

  if (!visible || !layer) return null;

  return createPortal(
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width,
        height,
        pointerEvents: "none",
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
    layer
  );
};

export default PencilCursorPortal;