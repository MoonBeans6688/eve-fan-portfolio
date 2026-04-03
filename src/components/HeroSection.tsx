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

  useEffect(() => {
    const interval = setInterval(() => {
      setPairIndex((prev) => (prev + 1) % WORD_PAIRS.length);
    }, 3000);
    return () => clearInterval(interval);
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

  // Sticker render helper
  const renderSticker = (
    id: string,
    src: string,
    alt: string,
    style: React.CSSProperties,
    rotate: number,
    hoverRotate: number,
    sizeClass: string,
    children?: React.ReactNode
  ) => {
    const drag = drags[id];
    const isHover = hovers[id] && !drag.isDragging;
    const rot = isHover ? hoverRotate : rotate;
    return (
      <div
        key={id}
        className="absolute select-none"
        style={{
          ...style,
          transform: `translate(${drag.x}px, ${drag.y}px) rotate(${rot}deg)${isHover ? " scale(1.04)" : ""}`,
          transition: drag.isDragging ? "none" : "transform 0.3s ease",
          cursor: drag.isDragging ? "grabbing" : "grab",
          filter: "drop-shadow(3px 5px 8px rgba(0,0,0,0.13))",
        }}
        onMouseDown={(e) => handleMouseDown(e, id)}
        onMouseEnter={() => setHovers((p) => ({ ...p, [id]: true }))}
        onMouseLeave={() => setHovers((p) => ({ ...p, [id]: false }))}
      >
        <img src={src} alt={alt} className={`${sizeClass} h-auto pointer-events-none`} draggable={false} />
        {children}
      </div>
    );
  };

  return (
    <section
      className="relative w-screen h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* ===== Center paper card ===== */}
      <div
        className="absolute select-none"
        style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)", zIndex: 5 }}
      >
        <div className="relative">
          <img
            src={gridPaper}
            alt=""
            className="w-[clamp(420px,50vw,700px)] h-auto pointer-events-none"
            draggable={false}
            style={{ filter: "drop-shadow(2px 4px 12px rgba(0,0,0,0.08))" }}
          />
          {/* Text overlay */}
          <div
            className="absolute inset-0 flex flex-col items-start justify-center pointer-events-none"
            style={{ paddingLeft: "12%", paddingRight: "8%", paddingTop: "2%" }}
          >
            <span className="font-display text-[clamp(14px,1.4vw,20px)] text-foreground/60 italic mb-1">
              I make...
            </span>
            <LayoutGroup>
              <motion.div
                layout
                className="inline-flex items-baseline flex-nowrap gap-[0.3em]"
                style={{ fontSize: "clamp(22px, 3.2vw, 48px)", maxWidth: "100%", overflow: "hidden" }}
              >
                <RotatingWord word={adj1} wordKey={`adj1-${pairIndex}`} />
                <motion.span layout className="font-display tracking-tight text-foreground whitespace-nowrap">
                  products for
                </motion.span>
                <RotatingWord word={adj2} wordKey={`adj2-${pairIndex}`} />
                <motion.span layout className="font-display tracking-tight text-foreground whitespace-nowrap">
                  realities.
                </motion.span>
              </motion.div>
            </LayoutGroup>
          </div>
        </div>
      </div>

      {/* ===== Stickers ===== */}

      {/* Orange scallop - top left */}
      {renderSticker("orange", stickerOrange, "Orange sticker",
        { left: "12vw", top: "18vh", zIndex: 6 },
        -6, -12, "w-[clamp(120px,12vw,180px)]",
        <span className="absolute inset-0 flex items-center justify-center font-mono text-[9px] md:text-[11px] font-semibold tracking-[0.14em] text-foreground/90 uppercase leading-tight text-center pointer-events-none"
          style={{ transform: "rotate(2deg)", paddingBottom: "10px" }}>
          Product<br />Designer
        </span>
      )}

      {/* Yellow star - bottom left */}
      {renderSticker("yellow", stickerYellow, "Yellow sticker",
        { left: "10vw", bottom: "10vh", zIndex: 5 },
        8, 14, "w-[clamp(170px,16vw,240px)]"
      )}

      {/* Blue blob - bottom right */}
      {renderSticker("blue", stickerBlue, "Blue sticker",
        { right: "22vw", bottom: "12vh", zIndex: 5 },
        -6, -10, "w-[clamp(150px,14vw,220px)]"
      )}

      {/* Purple double circle - right mid */}
      {renderSticker("purple", stickerPurple, "Purple sticker",
        { right: "10vw", top: "52vh", zIndex: 5 },
        4, 9, "w-[clamp(170px,16vw,260px)]"
      )}

      {/* ===== Name tag group (torn paper + clip) - top right ===== */}
      <div
        className="absolute"
        style={{ right: "12vw", top: "14vh", width: "clamp(200px,18vw,320px)", zIndex: 7 }}
      >
        {/* Torn paper (bottom layer) */}
        {(() => {
          const id = "torn";
          const drag = drags[id];
          const isHover = hovers[id] && !drag.isDragging;
          const rot = isHover ? 10 : 6;
          return (
            <div
              className="relative select-none"
              style={{
                zIndex: 7,
                transform: `translate(${drag.x}px, ${drag.y}px) rotate(${rot}deg)${isHover ? " scale(1.04)" : ""}`,
                transition: drag.isDragging ? "none" : "transform 0.3s ease",
                cursor: drag.isDragging ? "grabbing" : "grab",
                filter: "drop-shadow(3px 5px 8px rgba(0,0,0,0.13))",
              }}
              onMouseDown={(e) => handleMouseDown(e, id)}
              onMouseEnter={() => setHovers((p) => ({ ...p, [id]: true }))}
              onMouseLeave={() => setHovers((p) => ({ ...p, [id]: false }))}
            >
              <img src={stickerTorn} alt="Eve Fan" className="w-full h-auto pointer-events-none" draggable={false} />
              <span className="absolute inset-0 flex items-center justify-center font-display text-[clamp(20px,2.2vw,36px)] text-foreground/90 pointer-events-none"
                style={{ transform: "rotate(-1deg)", paddingBottom: "12px" }}>
                Eve Fan
              </span>
            </div>
          );
        })()}

        {/* Metal clip (top layer, overlapping paper top edge) */}
        {(() => {
          const id = "clip";
          const drag = drags[id];
          const isHover = hovers[id] && !drag.isDragging;
          const rot = isHover ? 5 : 2;
          return (
            <div
              className="absolute select-none"
              style={{
                left: "55%",
                top: "-18px",
                transform: `translateX(-50%) translate(${drag.x}px, ${drag.y}px) rotate(${rot}deg)${isHover ? " scale(1.04)" : ""}`,
                transition: drag.isDragging ? "none" : "transform 0.3s ease",
                cursor: drag.isDragging ? "grabbing" : "grab",
                zIndex: 9,
                filter: "drop-shadow(2px 3px 6px rgba(0,0,0,0.18))",
              }}
              onMouseDown={(e) => handleMouseDown(e, id)}
              onMouseEnter={() => setHovers((p) => ({ ...p, [id]: true }))}
              onMouseLeave={() => setHovers((p) => ({ ...p, [id]: false }))}
            >
              <img src={binderClip} alt="Binder clip" className="w-[clamp(50px,5vw,80px)] h-auto pointer-events-none" draggable={false} />
            </div>
          );
        })()}
      </div>
    </section>
  );
};

export default HeroSection;
