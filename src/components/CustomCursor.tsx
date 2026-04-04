import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [onCanvas, setOnCanvas] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickable = target.closest("a, button, [role='button'], [data-clickable], .clickable");
      const canvas = target.tagName === "CANVAS";
      setHovering(!!clickable);
      setOnCanvas(canvas);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  if (onCanvas) return null;

  const size = hovering ? 36 : 18;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full transition-all duration-200 ease-out mix-blend-normal"
      style={{
        width: size,
        height: size,
        background: "#D42F2F",
        transform: `translate(${pos.x - size / 2}px, ${pos.y - size / 2}px)`,
      }}
    />
  );
};

export default CustomCursor;
