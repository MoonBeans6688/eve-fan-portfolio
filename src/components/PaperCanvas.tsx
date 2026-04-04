import { useRef, useState, useCallback, useEffect } from "react";

interface PaperCanvasProps {
  width: number;
  height: number;
}

const PaperCanvas = ({ width, height }: PaperCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);

  // Set up canvas resolution
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

      // Draw multiple thin lines with slight offsets for pencil texture
      const dist = Math.hypot(to.x - from.x, to.y - from.y);
      const steps = Math.max(1, Math.floor(dist / 1.5));

      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const x = from.x + (to.x - from.x) * t;
        const y = from.y + (to.y - from.y) * t;

        // Main stroke
        ctx.beginPath();
        ctx.arc(
          x + (Math.random() - 0.5) * 1.2,
          y + (Math.random() - 0.5) * 1.2,
          0.6 + Math.random() * 0.6,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(212, 47, 47, ${0.55 + Math.random() * 0.3})`;
        ctx.fill();

        // Occasional grain particles
        if (Math.random() > 0.6) {
          ctx.beginPath();
          ctx.arc(
            x + (Math.random() - 0.5) * 3,
            y + (Math.random() - 0.5) * 3,
            0.2 + Math.random() * 0.3,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = `rgba(212, 47, 47, ${0.2 + Math.random() * 0.25})`;
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

  // Pencil cursor SVG as data URI
  const pencilCursor = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23D42F2F' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z'/%3E%3Cpath d='m15 5 4 4'/%3E%3C/svg%3E") 2 22, crosshair`;

  return (
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
  );
};

export default PaperCanvas;
