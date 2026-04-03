import { useState, useRef, useCallback, useEffect } from "react";
import StickerTrail from "./StickerTrail";
import gridPaper from "@/assets/grid-paper.png";
import stickerOrange from "@/assets/sticker-orange.png";
import stickerBlue from "@/assets/sticker-blue.png";
import stickerPurple from "@/assets/sticker-purple.png";
import stickerYellow from "@/assets/sticker-yellow.png";
import binderClip from "@/assets/binder-clip.png";
import stickerTorn from "@/assets/sticker-torn.png";

const WORD_PAIRS = [
  ["Clear", "Messy"],
  ["Honest", "Ambiguous"],
  ["Fun", "Dull"],
  ["Human", "Dehumanizing"],
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

interface StickerConfig {
  id: string;
  src: string;
  alt: string;
  className: string;
  style: React.CSSProperties;
  rotate: number;
  hoverRotate: number;
  children?: React.ReactNode;
}

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [pairIndex, setPairIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  // Rotating word pairs
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setPairIndex((prev) => (prev + 1) % WORD_PAIRS.length);
        setVisible(true);
      }, 280);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const [adj, noun] = WORD_PAIRS[pairIndex];

  // Draggable states for 6 stickers
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

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, id: string) => {
      e.preventDefault();
      e.stopPropagation();
      draggingRef.current = id;
      setDrags((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          isDragging: true,
          offsetX: e.clientX - prev[id].x,
          offsetY: e.clientY - prev[id].y,
        },
      }));
    },
    []
  );

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const id = draggingRef.current;
    if (!id) return;
    setDrags((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        x: e.clientX - prev[id].offsetX,
        y: e.clientY - prev[id].offsetY,
      },
    }));
  }, []);

  const handleMouseUp = useCallback(() => {
    const id = draggingRef.current;
    if (!id) return;
    draggingRef.current = null;
    setDrags((prev) => ({
      ...prev,
      [id]: { ...prev[id], isDragging: false },
    }));
  }, []);

  const stickerConfigs: StickerConfig[] = [
    {
      id: "orange",
      src: stickerOrange,
      alt: "Product Designer sticker",
      className: "w-[130px] md:w-[160px]",
      style: { left: "-90px", top: "20px" },
      rotate: -12,
      hoverRotate: -18,
      children: (
        <span className="absolute inset-0 flex items-center justify-center font-mono text-[9px] md:text-[11px] font-semibold tracking-[0.14em] text-foreground/90 uppercase leading-tight text-center pointer-events-none"
          style={{ transform: "rotate(2deg)", paddingBottom: "10px" }}>
          Product<br />Designer
        </span>
      ),
    },
    {
      id: "torn",
      src: stickerTorn,
      alt: "Eve Fan note",
      className: "w-[170px] md:w-[210px]",
      style: { right: "-70px", top: "10px" },
      rotate: 4,
      hoverRotate: 8,
      children: (
        <span className="absolute inset-0 flex items-center justify-center font-display text-2xl md:text-3xl text-foreground/90 pointer-events-none"
          style={{ transform: "rotate(-1deg)", paddingBottom: "12px" }}>
          Eve Fan
        </span>
      ),
    },
    {
      id: "clip",
      src: binderClip,
      alt: "Binder clip",
      className: "w-[60px] md:w-[80px]",
      style: { right: "-20px", top: "-60px" },
      rotate: 2,
      hoverRotate: 6,
    },
    {
      id: "purple",
      src: stickerPurple,
      alt: "Purple sticker",
      className: "w-[100px] md:w-[120px]",
      style: { right: "-60px", bottom: "-30px" },
      rotate: 5,
      hoverRotate: 10,
    },
    {
      id: "blue",
      src: stickerBlue,
      alt: "Blue sticker",
      className: "w-[100px] md:w-[120px]",
      style: { right: "30px", bottom: "-70px" },
      rotate: -3,
      hoverRotate: -8,
    },
    {
      id: "yellow",
      src: stickerYellow,
      alt: "Yellow sticker",
      className: "w-[100px] md:w-[130px]",
      style: { left: "-60px", bottom: "-60px" },
      rotate: 8,
      hoverRotate: 14,
    },
  ];

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <StickerTrail />

      <div className="relative z-10 flex flex-col items-center">
        <div className="relative">
          {/* Grid paper - fixed center */}
          <div className="relative select-none">
            <img
              src={gridPaper}
              alt=""
              className="w-[520px] md:w-[660px] h-auto pointer-events-none"
              draggable={false}
              style={{ filter: "drop-shadow(2px 4px 12px rgba(0,0,0,0.08))" }}
            />
            {/* Text overlay on paper */}
            <div className="absolute inset-0 flex flex-col items-start justify-center pointer-events-none"
              style={{ paddingLeft: "14%", paddingRight: "8%", paddingTop: "2%" }}>
              <span className="font-display text-base md:text-lg text-foreground/60 italic mb-1">
                I make...
              </span>
              <h1 className="font-display text-[1.6rem] md:text-[2.4rem] leading-[1.2] tracking-tight text-foreground whitespace-nowrap">
                <span className="inline-block relative">
                  <span
                    className="transition-opacity duration-[280ms]"
                    style={{ opacity: visible ? 1 : 0, minWidth: "max-content", display: "inline-block" }}
                  >
                    {adj}
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-red-500 rounded" />
                </span>{" "}
                Product For{" "}
                <span className="inline-block relative">
                  <span
                    className="transition-opacity duration-[280ms]"
                    style={{ opacity: visible ? 1 : 0, minWidth: "max-content", display: "inline-block" }}
                  >
                    {noun}
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-red-500 rounded" />
                </span>{" "}
                Realities
              </h1>
            </div>
          </div>
          {/* Draggable stickers */}
          {stickerConfigs.map((cfg) => {
            const drag = drags[cfg.id];
            const isHover = hovers[cfg.id] && !drag.isDragging;
            const rot = isHover ? cfg.hoverRotate : cfg.rotate;
            return (
              <div
                key={cfg.id}
                className="absolute z-20 select-none"
                style={{
                  ...cfg.style,
                  transform: `translate(${drag.x}px, ${drag.y}px) rotate(${rot}deg)${isHover ? " scale(1.04)" : ""}`,
                  transition: drag.isDragging ? "none" : "transform 0.3s ease",
                  cursor: drag.isDragging ? "grabbing" : "grab",
                  filter: "drop-shadow(3px 5px 8px rgba(0,0,0,0.15))",
                }}
                onMouseDown={(e) => handleMouseDown(e, cfg.id)}
                onMouseEnter={() => setHovers((p) => ({ ...p, [cfg.id]: true }))}
                onMouseLeave={() => setHovers((p) => ({ ...p, [cfg.id]: false }))}
              >
                <img
                  src={cfg.src}
                  alt={cfg.alt}
                  className={`${cfg.className} h-auto pointer-events-none`}
                  draggable={false}
                />
                {cfg.children}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
