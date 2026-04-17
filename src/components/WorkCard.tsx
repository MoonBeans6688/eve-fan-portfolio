import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import type { Project } from "@/data/projects";

interface WorkCardProps {
  work: Project;
  index: number;
  fullWidth?: boolean;
  fixedPlaceholder?: boolean;
}

const WorkCard = ({ work, index, fullWidth = false, fixedPlaceholder = false }: WorkCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (inView && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [inView]);

  return (
    <Link
      to={`/work/${work.slug}`}
      className="clickable group block overflow-visible relative"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {work.sticker && (
        <img
          src={work.sticker}
          alt="sticker"
          className="absolute -top-6 -right-6 w-48 z-10 pointer-events-none select-none"
          style={{ transform: 'rotate(8deg)' }}
        />
      )}
      <div ref={ref} className="relative overflow-hidden">
        {fixedPlaceholder ? (
          <div
            className="w-full bg-muted"
            style={{ aspectRatio: '1015 / 700' }}
          />
        ) : work.video ? (
          inView ? (
            <video
              ref={videoRef}
              src={work.video}
              poster={work.poster}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className={`w-full h-auto ${fullWidth ? '' : 'object-cover'} transition-transform duration-500 group-hover:scale-105`}
            />
          ) : (
            work.poster ? (
              <img src={work.poster} alt={work.title} className={`w-full h-auto ${fullWidth ? '' : 'object-cover'}`} />
            ) : (
              <div className={`w-full ${fullWidth ? 'aspect-video' : 'aspect-video'} bg-muted`} />
            )
          )
        ) : (
          <img
            src={work.thumbnail}
            alt={work.title}
            className={`w-full h-auto ${fullWidth ? '' : 'object-cover'} transition-transform duration-500 group-hover:scale-105`}
          />
        )}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />
      </div>
      <div className="pt-4 pb-8">
        {work.date && (
          <span className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase block mb-1.5">
            {work.date}{work.tag ? ` · ${work.tag}` : ''}
          </span>
        )}
        <h3 className="font-body text-base text-foreground group-hover:text-primary transition-colors duration-200 leading-tight mb-1 font-medium md:text-2xl">
          {work.title}
        </h3>
        <p className="font-body text-muted-foreground leading-relaxed line-clamp-2 text-base">
          {work.tagline}
        </p>
      </div>
    </Link>
  );
};

export default WorkCard;
