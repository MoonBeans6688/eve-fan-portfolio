import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import RotatingWord from "./RotatingWord";
import PaperCanvas from "./PaperCanvas";
import gridPaper from "@/assets/grid-paper.png";
import stickerOrange from "@/assets/sticker-orange.png";
import stickerBlue from "@/assets/sticker-blue.png";
import stickerPurple from "@/assets/sticker-purple.png";
import stickerYellow from "@/assets/sticker-yellow.png";
import binderClip from "@/assets/binder-clip.png";
import stickerTorn from "@/assets/eve-name-tag.png";

const WORD_PAIRS = [
  ["Clear", "Messy"],
  ["Honest", "Ambiguous"],
  ["Fun", "Dull"],
  ["Human", "Dehumanizing"],
];

const DESIGN_W = 2880;
const DESIGN_H = 2400;

interface DraggableState {
  x: number;
  y: number;
  isDragging: boolean;
  offsetX: number;
  offsetY: number;
}

const initDrag = (): DraggableState => ({
  x: 0, y: 0, isDragging: false, offsetX: 0, offsetY: 0,
});

const HeroSection = () => {
  const [pairIndex, setPairIndex] = useState(0);
  const [scale, setScale] = useState(1);
  

  useEffect(() => {
    const interval = setInterval(() => {
      setPairIndex((prev) => (prev + 1) % WORD_PAIRS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const update = () => {
      setScale(Math.min(window.innerWidth / DESIGN_W, window.innerHeight / DESIGN_H));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const [adj1, adj2] = WORD_PAIRS[pairIndex];

  // Draggable sticker states
  const [drags, setDrags] = useState<Record<string, DraggableState>>({
    orange: initDrag(),
    torn: initDrag(),
    clip: initDrag(),
    yellow: initDrag(),
    blue: initDrag(),
    purple: initDrag(),
  });
  const [hovers, setHovers] = useState<Record<string, boolean>>({});
  const draggingRef = useRef<string | null>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    draggingRef.current = id;
    setDrags((prev) => ({
      ...prev,
      [id]: { ...prev[id], isDragging: true, offsetX: e.clientX - prev[id].x, offsetY: e.clientY - prev[id].y },
    }));
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const id = draggingRef.current;
    if (!id) return;
    setDrags((prev) => ({
      ...prev,
      [id]: { ...prev[id], x: e.clientX - prev[id].offsetX, y: e.clientY - prev[id].offsetY },
    }));
  }, []);

  const handleMouseUp = useCallback(() => {
    const id = draggingRef.current;
    if (!id) return;
    draggingRef.current = null;
    setDrags((prev) => ({ ...prev, [id]: { ...prev[id], isDragging: false } }));
  }, []);

  const makeDraggable = (id: string) => ({
    onMouseDown: (e: React.MouseEvent) => handleMouseDown(e, id),
    onMouseEnter: () => setHovers((p) => ({ ...p, [id]: true })),
    onMouseLeave: () => setHovers((p) => ({ ...p, [id]: false })),
  });

  const dragStyle = (id: string, baseRotate: number, hoverRotate: number): React.CSSProperties => {
    const drag = drags[id];
    const isHover = hovers[id] && !drag.isDragging;
    const rot = isHover ? hoverRotate : baseRotate;
    return {
      transform: `translate(${drag.x}px, ${drag.y}px) rotate(${rot}deg)${isHover ? " scale(1.04)" : ""}`,
      transition: drag.isDragging ? "none" : "transform 0.3s ease",
      cursor: drag.isDragging ? "grabbing" : "grab",
      filter: "drop-shadow(4px 6px 10px rgba(0,0,0,0.13))",
    };
  };

  const PAPER_W = 2015;
  const PAPER_H = 1456;
  const PAPER_LEFT = 571;
  const PAPER_TOP = 412;

  const NAME_W = 682 * 0.85 * 1.2;
  const NAME_H = 540 * 0.85 * 1.2;
  const NAME_LEFT = 1897;
  const NAME_TOP = 356;

  return (
    <section
      className="relative w-screen h-screen overflow-hidden bg-background"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Fixed design stage */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: DESIGN_W,
          height: DESIGN_H,
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        {/* ===== Big paper card (base layer) ===== */}
        <div
          className="absolute"
          style={{
            left: PAPER_LEFT,
            top: PAPER_TOP,
            width: PAPER_W,
            height: PAPER_H,
            zIndex: 5,
          }}
        >
          <img
            src={gridPaper}
            alt=""
            className="w-full h-full pointer-events-none select-none"
            draggable={false}
            style={{ filter: "drop-shadow(2px 4px 16px rgba(0,0,0,0.08))" }}
          />
          {/* Drawing canvas layer */}
          <PaperCanvas width={PAPER_W} height={PAPER_H} />
          {/* Text overlay — 3-part stacked composition */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none"
            style={{ padding: "6% 8%" }}
          >
            {/* "I make..." */}
            <span className="font-display text-foreground/60 italic mb-6" style={{ fontSize: 42 }}>
              I make...
            </span>

            {/* Line 1: adj1 + Product */}
            <div className="flex items-baseline justify-center gap-[0.25em] mb-2" style={{ fontSize: 108 }}>
              <RotatingWord word={adj1} wordKey={`adj1-${pairIndex}`} />
              <span className="font-display tracking-tight text-foreground whitespace-nowrap">
                Product
              </span>
            </div>

            {/* Arrow + "for" annotation */}
            <div className="flex items-center justify-center gap-4 my-2" style={{ height: 110 }}>
              <svg width="36" height="96" viewBox="0 0 36 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="18" y1="0" x2="18" y2="80" stroke="#D42F2F" strokeWidth="4" />
                <polygon points="8,76 18,96 28,76" fill="#D42F2F" />
              </svg>
              <span className="font-display italic text-foreground/60" style={{ fontSize: 44 }}>
                for
              </span>
            </div>

            {/* Line 3: adj2 + Realities */}
            <div className="flex items-baseline justify-center gap-[0.25em] mt-2" style={{ fontSize: 108 }}>
              <RotatingWord word={adj2} wordKey={`adj2-${pairIndex}`} />
              <span className="font-display tracking-tight text-foreground whitespace-nowrap">
                Realities.
              </span>
            </div>
          </div>
        </div>

        {/* ===== Orange "PRODUCT DESIGNER" sticker ===== */}
        <div
          className="absolute select-none"
          style={{ left: 784, top: 249, width: 482, height: 441, zIndex: 6, ...dragStyle("orange", 0, -6) }}
          {...makeDraggable("orange")}
        >
          <img src={stickerOrange} alt="Product Designer sticker" className="w-full h-full pointer-events-none object-contain" draggable={false} />
        </div>

        {/* ===== Yellow star (bottom-left) ===== */}
        <div
          className="absolute select-none"
          style={{ left: 230, top: 1406, width: 635, height: 668, zIndex: 5, ...dragStyle("yellow", 0, 8) }}
          {...makeDraggable("yellow")}
        >
          <img src={stickerYellow} alt="Yellow sticker" className="w-full h-full pointer-events-none object-contain" draggable={false} />
        </div>

        {/* ===== Blue blob (bottom-right) ===== */}
        <div
          className="absolute select-none"
          style={{ left: 1930, top: 1618, width: 493, height: 473, zIndex: 5, ...dragStyle("blue", 0, -6) }}
          {...makeDraggable("blue")}
        >
          <img src={stickerBlue} alt="Blue sticker" className="w-full h-full pointer-events-none object-contain" draggable={false} />
        </div>

        {/* ===== Purple double-blob (right) ===== */}
        <div
          className="absolute select-none"
          style={{ left: 2393, top: 1140, width: 489, height: 322, zIndex: 5, ...dragStyle("purple", -6.73, -12) }}
          {...makeDraggable("purple")}
        >
          <img src={stickerPurple} alt="Purple sticker" className="w-full h-full pointer-events-none object-contain" draggable={false} />
        </div>

        {/* ===== Name paper "Eve Fan" (ON TOP of big paper) ===== */}
        <div
          className="absolute select-none"
          style={{ left: NAME_LEFT, top: NAME_TOP, width: NAME_W, height: NAME_H, zIndex: 7, ...dragStyle("torn", 0, 6) }}
          {...makeDraggable("torn")}
        >
          <img src={stickerTorn} alt="Eve Fan" className="w-full h-full pointer-events-none object-contain" draggable={false} />
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
