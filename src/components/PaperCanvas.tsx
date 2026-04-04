import { useRef, useState, useCallback, useEffect } from "react";
import pencilCursorImg from "@/assets/pencil-cursor.png";

interface PaperCanvasProps {
  width: number;
  height: number;
}

const PaperCanvas = ({ width, height }: PaperCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hasStrokes, setHasStrokes] = useState(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
  }, [width, height]);

  const getPos = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (width / rect.width),
      y: (e.clientY - rect.top) * (height / rect.height),
    };
  }, [width, height]);

  const drawStroke = useCallback(
    (from: { x: number; y: number }, to: { x: number; y: number }) => {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;

      const dist = Math.hypot(to.x - from.x, to.y - from.y);
      const steps = Math.max(1, Math.floor(dist / 1.2));

      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const x = from.x + (to.x - from.x) * t;
        const y = from.y + (to.y - from.y) * t;

        // Main stroke — thicker
        ctx.beginPath();
        ctx.arc(
          x + (Math.random() - 0.5) * 1.8,
          y + (Math.random() - 0.5) * 1.8,
          1.2 + Math.random() * 1.0,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(212, 47, 47, ${0.6 + Math.random() * 0.3})`;
        ctx.fill();

        // Secondary stroke for thickness
        if (Math.random() > 0.3) {
          ctx.beginPath();
          ctx.arc(
            x + (Math.random() - 0.5) * 2.4,
            y + (Math.random() - 0.5) * 2.4,
            0.8 + Math.random() * 0.7,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = `rgba(212, 47, 47, ${0.45 + Math.random() * 0.25})`;
          ctx.fill();
        }

        // Grain particles
        if (Math.random() > 0.55) {
          ctx.beginPath();
          ctx.arc(
            x + (Math.random() - 0.5) * 4,
            y + (Math.random() - 0.5) * 4,
            0.3 + Math.random() * 0.4,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = `rgba(212, 47, 47, ${0.2 + Math.random() * 0.2})`;
          ctx.fill();
        }
      }
    },
    []
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const pos = getPos(e);
      lastPoint.current = pos;
      setIsDrawing(true);
      setHasStrokes(true);
    },
    [getPos]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isDrawing || !lastPoint.current) return;
      const pos = getPos(e);
      drawStroke(lastPoint.current, pos);
      lastPoint.current = pos;
    },
    [isDrawing, getPos, drawStroke]
  );

  const handleMouseUp = useCallback(() => {
    setIsDrawing(false);
    lastPoint.current = null;
  }, []);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasStrokes(false);
  }, []);

  // Pencil cursor: tip is at bottom-left of image, so hotspot near bottom-left
  const pencilCursor = `url("${pencilCursorImg}") 4 28, crosshair`;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{
          width: "100%",
          height: "100%",
          cursor: isHovering ? pencilCursor : undefined,
          zIndex: 2,
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          handleMouseUp();
          setIsHovering(false);
        }}
        onMouseEnter={() => setIsHovering(true)}
      />
      {/* Clear button */}
      {hasStrokes && (
        <button
          onClick={clearCanvas}
          className="absolute font-mono text-[11px] tracking-wide text-foreground/40 hover:text-foreground/70 transition-colors pointer-events-auto"
          style={{
            bottom: 18,
            right: 24,
            zIndex: 3,
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          clear ✕
        </button>
      )}
    </>
  );
};

export default PaperCanvas;
