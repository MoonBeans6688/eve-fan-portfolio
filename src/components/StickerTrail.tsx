import { useCallback, useRef, useState } from "react";

const STICKERS = [
  "✨ design lover",
  "🎯 detail-oriented",
  "🧋 boba addict",
  "🎨 pixel perfect",
  "💡 problem solver",
  "🌱 always growing",
  "📐 systems thinker",
  "🎧 lo-fi & flow",
  "🔍 curious mind",
  "🪄 making magic",
  "🐱 cat person",
  "📖 story-driven",
];

interface Sticker {
  id: number;
  x: number;
  y: number;
  text: string;
  rotation: number;
}

const StickerTrail = () => {
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const lastSpawn = useRef(0);
  const idRef = useRef(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const now = Date.now();
      if (now - lastSpawn.current < 400) return;
      lastSpawn.current = now;

      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newSticker: Sticker = {
        id: idRef.current++,
        x,
        y,
        text: STICKERS[Math.floor(Math.random() * STICKERS.length)],
        rotation: Math.random() * 20 - 10,
      };

      setStickers((prev) => [...prev, newSticker]);

      setTimeout(() => {
        setStickers((prev) => prev.filter((s) => s.id !== newSticker.id));
      }, 1200);
    },
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden" onMouseMove={handleMouseMove}>
      {stickers.map((s) => (
        <div
          key={s.id}
          className="absolute pointer-events-none animate-sticker-pop"
          style={{
            left: s.x,
            top: s.y,
            transform: `translate(-50%, -50%) rotate(${s.rotation}deg)`,
          }}
        >
          <div className="bg-card px-3 py-1.5 rounded-full shadow-md border border-border font-mono text-xs whitespace-nowrap text-foreground">
            {s.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StickerTrail;
