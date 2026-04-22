import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  // Latest pointer position (updated synchronously on every mousemove)
  const pos = useRef({ x: -100, y: -100 });
  // Current visual state, only changes when it actually changes
  const state = useRef<{ hovering: boolean; onCanvas: boolean; label: string | null }>({
    hovering: false,
    onCanvas: false,
    label: null,
  });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!dot || !label) return;

    const render = () => {
      rafId.current = null;
      const { x, y } = pos.current;
      const { hovering, onCanvas, label: text } = state.current;

      if (onCanvas) {
        dot.style.opacity = "0";
        label.style.opacity = "0";
        return;
      }

      if (text) {
        // Show label pill, hide dot
        dot.style.opacity = "0";
        label.style.opacity = "1";
        label.textContent = text;
        // translate3d forces GPU compositing -> no jitter
        label.style.transform = `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0)`;
      } else {
        label.style.opacity = "0";
        dot.style.opacity = "1";
        const size = hovering ? 36 : 18;
        // Update size via CSS vars so the size transition still animates,
        // while position is updated every frame with no transition.
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;
        dot.style.transform = `translate3d(${x - size / 2}px, ${y - size / 2}px, 0)`;
      }
    };

    const schedule = () => {
      if (rafId.current == null) {
        rafId.current = requestAnimationFrame(render);
      }
    };

    const onMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      schedule();
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target || !target.closest) return;
      const clickable = !!target.closest("a, button, [role='button'], [data-clickable], .clickable");
      const onCanvas = target.tagName === "CANVAS";
      const labelEl = target.closest("[data-cursor-label]") as HTMLElement | null;
      const labelText = labelEl ? labelEl.getAttribute("data-cursor-label") : null;

      const s = state.current;
      if (s.hovering !== clickable || s.onCanvas !== onCanvas || s.label !== labelText) {
        s.hovering = clickable;
        s.onCanvas = onCanvas;
        s.label = labelText;
        schedule();
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      if (rafId.current != null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          width: 18,
          height: 18,
          background: "hsl(24, 95%, 58%)",
          transform: "translate3d(-100px, -100px, 0)",
          // Only animate size/opacity, NEVER transform — that caused the trailing/lag.
          transition: "width 180ms ease-out, height 180ms ease-out, opacity 150ms ease-out",
          willChange: "transform, width, height",
          backfaceVisibility: "hidden",
        }}
      />
      {/* Label pill */}
      <div
        ref={labelRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center px-4 h-9 font-mono text-xs whitespace-nowrap"
        style={{
          background: "hsl(24, 95%, 58%)",
          color: "hsl(0, 0%, 100%)",
          transform: "translate3d(-200px, -200px, 0)",
          opacity: 0,
          transition: "opacity 150ms ease-out",
          willChange: "transform, opacity",
          backfaceVisibility: "hidden",
        }}
      />
    </>
  );
};

export default CustomCursor;
