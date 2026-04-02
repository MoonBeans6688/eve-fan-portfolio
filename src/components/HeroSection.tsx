import { useState, useRef, useCallback } from "react";
import StickerTrail from "./StickerTrail";
import tornPaper from "@/assets/torn-paper.png";
import stickerBlob from "@/assets/sticker-blob.png";

interface DraggableItem {
  x: number;
  y: number;
  isDragging: boolean;
  offsetX: number;
  offsetY: number;
}

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  const [paper, setPaper] = useState<DraggableItem>({
    x: 0, y: 0, isDragging: false, offsetX: 0, offsetY: 0,
  });
  const [sticker, setSticker] = useState<DraggableItem>({
    x: 0, y: 0, isDragging: false, offsetX: 0, offsetY: 0,
  });
  const [paperHover, setPaperHover] = useState(false);
  const [stickerHover, setStickerHover] = useState(false);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, setter: React.Dispatch<React.SetStateAction<DraggableItem>>, state: DraggableItem) => {
      e.preventDefault();
      e.stopPropagation();
      setter({
        ...state,
        isDragging: true,
        offsetX: e.clientX - state.x,
        offsetY: e.clientY - state.y,
      });
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      setPaper((prev) =>
        prev.isDragging
          ? { ...prev, x: e.clientX - prev.offsetX, y: e.clientY - prev.offsetY }
          : prev
      );
      setSticker((prev) =>
        prev.isDragging
          ? { ...prev, x: e.clientX - prev.offsetX, y: e.clientY - prev.offsetY }
          : prev
      );
    },
    []
  );

  const handleMouseUp = useCallback(() => {
    setPaper((prev) => (prev.isDragging ? { ...prev, isDragging: false } : prev));
    setSticker((prev) => (prev.isDragging ? { ...prev, isDragging: false } : prev));
  }, []);

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
        {/* Draggable group wrapper */}
        <div className="relative">
          {/* Sticker blob - positioned to overlap left side of paper like reference */}
          <div
            className="absolute z-20 select-none"
            style={{
              left: "-90px",
              top: "10px",
              transform: `translate(${sticker.x}px, ${sticker.y}px) rotate(-8deg) ${stickerHover && !sticker.isDragging ? "rotate(-12deg) scale(1.03)" : ""}`,
              transition: sticker.isDragging ? "none" : "transform 0.3s ease",
              cursor: sticker.isDragging ? "grabbing" : "grab",
              filter: "drop-shadow(4px 6px 8px rgba(0,0,0,0.18))",
            }}
            onMouseDown={(e) => handleMouseDown(e, setSticker, sticker)}
            onMouseEnter={() => setStickerHover(true)}
            onMouseLeave={() => setStickerHover(false)}
          >
            <img
              src={stickerBlob}
              alt=""
              className="w-[140px] md:w-[180px] h-auto pointer-events-none"
              draggable={false}
            />
            <span
              className="absolute inset-0 flex items-center justify-center font-mono text-[11px] md:text-[13px] font-medium tracking-[0.12em] text-foreground/85 uppercase leading-tight text-center pointer-events-none"
              style={{ transform: "rotate(2deg)", paddingBottom: "8px" }}
            >
              Product<br />Designer
            </span>
          </div>

          {/* Torn paper with name */}
          <div
            className="relative select-none"
            style={{
              transform: `translate(${paper.x}px, ${paper.y}px) ${paperHover && !paper.isDragging ? "rotate(2deg) scale(1.02)" : ""}`,
              transition: paper.isDragging ? "none" : "transform 0.3s ease",
              cursor: paper.isDragging ? "grabbing" : "grab",
            }}
            onMouseDown={(e) => handleMouseDown(e, setPaper, paper)}
            onMouseEnter={() => setPaperHover(true)}
            onMouseLeave={() => setPaperHover(false)}
          >
            <img
              src={tornPaper}
              alt=""
              className="w-[420px] md:w-[560px] h-auto pointer-events-none"
              draggable={false}
            />
            <h1 className="absolute inset-0 flex items-center justify-center font-display text-6xl md:text-8xl font-normal tracking-tight text-foreground leading-none pointer-events-none"
              style={{ paddingBottom: "16px" }}
            >
              Eve Fan
            </h1>
          </div>
        </div>

        {/* Slogan */}
        <p className="font-mono text-sm md:text-base tracking-widest text-muted-foreground uppercase mt-8">
          Clear products for messy realities.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
