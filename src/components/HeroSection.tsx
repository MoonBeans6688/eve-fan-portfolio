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
      className: "w-[140px] md:w-[180px]",
      style: { left: "-100px", top: "-60px" },
      rotate: -12,
      hoverRotate: -18,
      children: (
        <span className="absolute inset-0 flex items-center justify-center font-mono text-[10px] md:text-[12px] font-semibold tracking-[0.14em] text-foreground/90 uppercase leading-tight text-center pointer-events-none"
          style={{ transform: "rotate(2deg)", paddingBottom: "10px" }}>
          Product<br />Designer
        </span>
      ),
    },
    {
      id: "clip",
      src: binderClip,
      alt: "Binder clip",
      className: "w-[70px] md:w-[90px]",
      style: { right: "40px", top: "-70px" },
      rotate: 2,
      hoverRotate: 6,
    },
    {
      id: "torn",
      src: stickerTorn,
      alt: "Eve Fan note",
      className: "w-[180px] md:w-[220px]",
      style: { right: "-60px", top: "-30px" },
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
      id: "purple",
      src: stickerPurple,
      alt: "Purple sticker",
      className: "w-[110px] md:w-[140px]",
      style: { right: "-80px", bottom: "-20px" },
      rotate: 5,
      hoverRotate: 10,
    },
    {
      id: "blue",
      src: stickerBlue,
      alt: "Blue sticker",
      className: "w-[110px] md:w-[140px]",
      style: { right: "-50px", bottom: "-70px" },
      rotate: -3,
      hoverRotate: -8,
    },
    {
      id: "yellow",
      src: stickerYellow,
      alt: "Yellow sticker",
      className: "w-[110px] md:w-[140px]",
      style: { left: "-70px", bottom: "-80px" },
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
              className="w-[480px] md:w-[620px] h-auto pointer-events-none"
              draggable={false}
              style={{ filter: "drop-shadow(2px 4px 12px rgba(0,0,0,0.08))" }}
            />
            {/* Text overlay on paper */}
            <div className="absolute inset-0 flex flex-col items-start justify-center pointer-events-none"
              style={{ paddingLeft: "18%", paddingRight: "12%", paddingTop: "4%" }}>
              <span className="font-display text-lg md:text-xl text-foreground/60 italic mb-1">
                I make...
              </span>
              <h1 className="font-display text-[2.2rem] md:text-[3.2rem] leading-[1.15] tracking-tight text-foreground">
                <span className="inline-block relative">
                  <span
                    className="transition-opacity duration-[280ms]"
                    style={{ opacity: visible ? 1 : 0 }}
                  >
                    {adj}
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-red-500 rounded" />
                </span>{" "}
                Product For{" "}
                <span className="inline-block relative">
                  <span
                    className="transition-opacity duration-[280ms]"
                    style={{ opacity: visible ? 1 : 0 }}
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
