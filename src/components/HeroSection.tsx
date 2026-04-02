import StickerTrail from "./StickerTrail";
import tornPaper from "@/assets/torn-paper.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <StickerTrail />
      <div className="relative z-10 flex flex-col items-center">
        {/* Torn paper with name */}
        <div className="relative">
          <img
            src={tornPaper}
            alt=""
            className="w-[420px] md:w-[560px] h-auto select-none pointer-events-none"
            draggable={false}
          />
          {/* Name on paper */}
          <h1 className="absolute inset-0 flex items-center justify-center font-display text-6xl md:text-8xl font-normal tracking-tight text-foreground leading-none pb-8">
            Eve Fan
          </h1>
          {/* Vintage stamp */}
          <div
            className="absolute -bottom-4 -right-4 md:-bottom-2 md:-right-6 w-28 h-28 md:w-32 md:h-32 flex items-center justify-center"
            style={{ transform: "rotate(12deg)" }}
          >
            <div className="relative w-full h-full rounded-full border-[3px] border-red-700/80 flex items-center justify-center p-3">
              <div className="absolute inset-[6px] rounded-full border-[1.5px] border-red-700/50" />
              <span
                className="font-mono text-[10px] md:text-xs font-bold tracking-[0.15em] text-red-700/85 uppercase text-center leading-tight"
              >
                Product<br />Designer
              </span>
            </div>
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
