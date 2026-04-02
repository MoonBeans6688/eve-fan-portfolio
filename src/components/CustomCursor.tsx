import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickable = target.closest("a, button, [role='button'], [data-clickable], .clickable");
      setHovering(!!clickable);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  const size = hovering ? 28 : 12;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-primary transition-all duration-200 ease-out mix-blend-normal"
      style={{
        width: size,
        height: size,
        transform: `translate(${pos.x - size / 2}px, ${pos.y - size / 2}px)`,
      }}
    />
  );
};

export default CustomCursor;
