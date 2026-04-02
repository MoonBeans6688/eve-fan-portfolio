import StickerTrail from "./StickerTrail";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <StickerTrail />
      <div className="relative z-10 text-center px-4">
        <h1 className="font-display text-7xl md:text-9xl font-normal tracking-tight text-foreground leading-none mb-6">
          Eve Fan
        </h1>
        <p className="font-mono text-sm md:text-base tracking-widest text-muted-foreground uppercase">
          Clear products for messy realities.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
