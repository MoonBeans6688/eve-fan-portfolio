import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [onCanvas, setOnCanvas] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickable = target.closest("a, button, [role='button'], [data-clickable], .clickable");
      const canvas = target.tagName === "CANVAS";
      const labelEl = target.closest("[data-cursor-label]") as HTMLElement | null;
      setHovering(!!clickable);
      setOnCanvas(canvas);
      setLabel(labelEl ? labelEl.getAttribute("data-cursor-label") : null);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  if (onCanvas) return null;

  if (label) {
    return (
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full transition-[width,height,padding,border-radius] duration-200 ease-out flex items-center justify-center px-4 h-9 font-mono text-xs whitespace-nowrap"
        style={{
          background: "hsl(24, 95%, 58%)",
          color: "hsl(0, 0%, 100%)",
          transform: `translate(calc(${pos.x}px - 50%), calc(${pos.y}px - 50%))`,
        }}
      >
        {label}
      </div>
    );
  }

  const size = hovering ? 36 : 18;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full transition-all duration-200 ease-out mix-blend-normal"
      style={{
        width: size,
        height: size,
        background: "hsl(24, 95%, 58%)",
        transform: `translate(${pos.x - size / 2}px, ${pos.y - size / 2}px)`,
      }}
    />
  );
};

export default CustomCursor;
