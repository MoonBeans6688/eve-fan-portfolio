import { useState, useRef, useCallback, useEffect } from "react";
import { motion, LayoutGroup } from "framer-motion";
import RotatingWord from "./RotatingWord";
import gridPaper from "@/assets/grid-paper.png";
import stickerOrange from "@/assets/sticker-orange.png";
import stickerBlue from "@/assets/sticker-blue.png";
import stickerPurple from "@/assets/sticker-purple.png";
import stickerYellow from "@/assets/sticker-yellow.png";
import binderClip from "@/assets/binder-clip.png";
import stickerTorn from "@/assets/sticker-torn.png";

const WORD_PAIRS = [
  ["Clear", "messy"],
  ["Honest", "ambiguous"],
  ["Fun", "dull"],
  ["Human", "dehumanizing"],
];

const DESIGN_W = 2880;
const DESIGN_H = 2800;

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
  const sloganRef = useRef<HTMLDivElement>(null);

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

  // Big paper dimensions from PS
  const PAPER_W = 2015;
  const PAPER_H = 1456;
  const PAPER_LEFT = 571;
  const PAPER_TOP = 1102;

  // Name paper scaled to 0.85x
  const NAME_W = 682 * 0.85;
  const NAME_H = 540 * 0.85;
  const NAME_LEFT = 1897;
  const NAME_TOP = 1066;

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
          className="absolute select-none"
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
            className="w-full h-full pointer-events-none"
            draggable={false}
            style={{ filter: "drop-shadow(2px 4px 16px rgba(0,0,0,0.08))" }}
          />
          {/* Text overlay */}
          <div
            className="absolute inset-0 flex flex-col items-start justify-center pointer-events-none"
            style={{ paddingLeft: "10%", paddingRight: "10%", paddingTop: "1%" }}
          >
            <span className="font-display text-foreground/60 italic mb-4" style={{ fontSize: 44 }}>
              I make...
            </span>
            <LayoutGroup>
              <motion.div
                ref={sloganRef}
                layout
                className="inline-flex items-baseline flex-nowrap gap-[0.3em]"
                style={{ fontSize: 88, maxWidth: "100%", overflow: "hidden" }}
              >
                <RotatingWord word={adj1} wordKey={`adj1-${pairIndex}`} />
                <motion.span layout className="font-display tracking-tight text-foreground whitespace-nowrap">
                  {" products for "}
                </motion.span>
                <RotatingWord word={adj2} wordKey={`adj2-${pairIndex}`} />
                <motion.span layout className="font-display tracking-tight text-foreground whitespace-nowrap">
                  {" realities."}
                </motion.span>
              </motion.div>
            </LayoutGroup>
          </div>
        </div>

        {/* ===== Orange "PRODUCT DESIGNER" sticker ===== */}
        <div
          className="absolute select-none"
          style={{ left: 784, top: 939, width: 482, height: 441, zIndex: 6, ...dragStyle("orange", 0, -6) }}
          {...makeDraggable("orange")}
        >
          <img src={stickerOrange} alt="Orange sticker" className="w-full h-full pointer-events-none object-contain" draggable={false} />
          <span
            className="absolute inset-0 flex items-center justify-center font-mono text-[16px] font-semibold tracking-[0.14em] text-foreground/90 uppercase leading-tight text-center pointer-events-none"
            style={{ transform: "rotate(2deg)", paddingBottom: 14 }}
          >
            Product<br />Designer
          </span>
        </div>

        {/* ===== Yellow star (bottom-left) ===== */}
        <div
          className="absolute select-none"
          style={{ left: 230, top: 2096, width: 635, height: 668, zIndex: 5, ...dragStyle("yellow", 0, 8) }}
          {...makeDraggable("yellow")}
        >
          <img src={stickerYellow} alt="Yellow sticker" className="w-full h-full pointer-events-none object-contain" draggable={false} />
        </div>

        {/* ===== Blue blob (bottom-right) ===== */}
        <div
          className="absolute select-none"
          style={{ left: 1930, top: 2308, width: 493, height: 473, zIndex: 5, ...dragStyle("blue", 0, -6) }}
          {...makeDraggable("blue")}
        >
          <img src={stickerBlue} alt="Blue sticker" className="w-full h-full pointer-events-none object-contain" draggable={false} />
        </div>

        {/* ===== Purple double-blob (right) ===== */}
        <div
          className="absolute select-none"
          style={{ left: 2393, top: 1830, width: 489, height: 322, zIndex: 5, ...dragStyle("purple", -6.73, -12) }}
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
          <span
            className="absolute inset-0 flex items-center justify-center font-display text-[40px] text-foreground/90 pointer-events-none"
            style={{ transform: "rotate(-1deg)", paddingBottom: 16 }}
          >
            Eve Fan
          </span>
        </div>

        {/* ===== Metal clip (ABOVE name paper) ===== */}
        <div
          className="absolute select-none"
          style={{ left: 2131, top: 865, width: 383, height: 339, zIndex: 9, ...dragStyle("clip", 11.08, 16) }}
          {...makeDraggable("clip")}
        >
          <img src={binderClip} alt="Binder clip" className="w-full h-full pointer-events-none object-contain" draggable={false} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
