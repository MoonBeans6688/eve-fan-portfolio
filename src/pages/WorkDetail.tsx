import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { getProjectBySlug } from "@/data/projects";
import NotFound from "./NotFound";

const WorkDetail = () => {
  const { id } = useParams();
  const project = id ? getProjectBySlug(id) : undefined;

  const tocItems = [
    { id: "home", label: "HOME", isBack: true },
    { id: "overview", label: "OVERVIEW" },
    ...(project?.sections.map((s) => ({ id: s.id, label: s.title })) ?? []),
  ];

  const [activeSection, setActiveSection] = useState("overview");
  const [tocOpen, setTocOpen] = useState(false);

  useEffect(() => {
    if (!project) return;
    const sectionIds = tocItems.filter((t) => !t.isBack).map((t) => t.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );
    sectionIds.forEach((sid) => {
      const el = document.getElementById(sid);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [project]);

  const scrollTo = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setTocOpen(false);
    }
  }, []);

  if (!project) return <NotFound />;

  return (
    <div className={`min-h-screen bg-background ${project.slug === "the-jar" ? "the-jar-dark" : ""}`}>
      {/* Mobile TOC */}
      <div className="md:hidden sticky top-0 z-40 bg-background/90 backdrop-blur-sm border-b border-border px-4 py-3">
        <button
          onClick={() => setTocOpen(!tocOpen)}
          className="clickable font-mono text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-2"
        >
          On this page
          <span className={`transition-transform duration-200 ${tocOpen ? "rotate-180" : ""}`}>▾</span>
        </button>
        {tocOpen && (
          <nav className="mt-2 flex flex-col gap-1 pb-2">
            {tocItems.map((item) =>
              item.isBack ? (
                <Link
                  key={item.id}
                  to="/#selected-works"
                  className="clickable font-mono text-xs text-muted-foreground hover:text-foreground transition-colors py-1 flex items-center gap-1"
                >
                  <ArrowLeft size={12} />
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`clickable font-mono text-xs text-left py-1 uppercase transition-colors ${
                    activeSection === item.id
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </button>
              )
            )}
          </nav>
        )}
      </div>

      <div className="flex">
        {/* Desktop TOC Sidebar */}
        <aside className="hidden md:block w-[240px] flex-shrink-0 pl-8 pt-28">
          <nav className="sticky top-24 flex flex-col gap-2">
            {tocItems.map((item) =>
              item.isBack ? (
                <Link
                  key={item.id}
                  to="/#selected-works"
                  className="clickable font-mono text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 py-1.5 flex items-center gap-1.5 mb-4 border border-border rounded px-2 w-fit"
                >
                  <ArrowLeft size={12} />
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`clickable font-mono text-xs text-left py-1.5 tracking-wider uppercase transition-colors duration-200 ${
                    activeSection === item.id
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </button>
              )
            )}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {/* Hero */}
          <section className="w-full overflow-hidden pt-[72px]">
            {project.heroVideo ? (
              <video
                src={project.heroVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto block mb-[-4%]"
                style={
                  project.slug === "the-jar"
                    ? { clipPath: "inset(8% 0 0 0)", marginTop: "-8%" }
                    : undefined
                }
              />
            ) : project.heroImage ? (
              <img
                src={project.heroImage}
                alt={project.title}
                className="w-full h-auto block"
              />
            ) : (
              <div className="h-[65vh] flex items-center justify-center">
                <span className="font-mono text-sm text-muted-foreground">Hero cover image</span>
              </div>
            )}
          </section>

          {/* Summary Band */}
          <section id="overview" className="relative px-8 md:px-16 py-16 border-b border-border">
            {project.slug === "the-jar" && (
              <img
                src="/images/winner-sticker-figbuild.png"
                alt="FigBuild 2026 Winner — Most Creative"
                className="hidden md:block absolute pointer-events-none select-none"
                style={{
                  top: "2.5rem",
                  right: "3rem",
                  width: "min(280px, 22vw)",
                  transform: "rotate(8deg)",
                  filter: "drop-shadow(4px 8px 14px rgba(0,0,0,0.18))",
                  zIndex: 10,
                }}
                draggable={false}
              />
            )}
            <div className="relative">
              {project.slug === "dear-remains" && (
                <img
                  src="/images/uxda-nominated-2026.png"
                  alt="UX Design Awards 2026 — Nominated"
                  className="hidden md:block absolute pointer-events-none select-none"
                  style={{
                    top: 0,
                    bottom: 0,
                    right: "0",
                    height: "100%",
                    width: "auto",
                    objectFit: "contain",
                    filter: "drop-shadow(4px 8px 14px rgba(0,0,0,0.12))",
                    zIndex: 10,
                  }}
                  draggable={false}
                />
              )}
              <h1 className="font-display text-3xl md:text-5xl text-foreground mb-4 leading-tight">
                {project.title}
              </h1>
              {(project.overviewTagline || project.tagline) && (
                <p className="font-body text-base md:text-lg text-muted-foreground mb-10 leading-relaxed">
                  {project.overviewTagline || project.tagline}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {project.meta.map((m) => (
                <div key={m.label}>
                  <p className="font-mono text-xs uppercase tracking-wider mb-2 font-medium text-[#4d4afc]">
                    {m.label}
                  </p>
                  <p className="font-body text-sm text-foreground whitespace-pre-line leading-relaxed">
                    {m.label === "TIMELINE" && m.value.includes("\n") ? (
                      <>
                        {m.value.split("\n")[0]}
                        {"\n"}
                        <span className="text-xs text-muted-foreground">
                          {m.value.split("\n").slice(1).join("\n")}
                        </span>
                      </>
                    ) : (
                      m.value
                    )}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Content Sections */}
          {project.sections.map((section, i) => (
            <section
              key={section.id}
              id={section.id}
              className={`px-8 md:px-16 py-20 ${
                i < project.sections.length - 1 ? "border-b border-border" : "pb-32"
              }`}
            >
              <h2
                className="font-mono text-xs tracking-wider uppercase mb-6 font-medium"
                style={{ color: '#4D4AFC' }}
              >
                {section.title}
              </h2>
              {section.heading && (
                <h3 className="font-body text-[20px] text-foreground leading-snug mb-3" dangerouslySetInnerHTML={{ __html: section.heading }} />
              )}
              <div className="font-body text-muted-foreground leading-relaxed text-base space-y-4">
                {section.content.split("\n\n").map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
              {section.caption && (
                <p className="font-display text-muted-foreground mt-3 italic text-sm">
                  {section.caption}
                </p>
              )}
              {section.vimeoId ? (
                <div className="w-full aspect-video mt-8 rounded overflow-hidden bg-black">
                  <iframe
                    src={`https://player.vimeo.com/video/${section.vimeoId}?title=0&byline=0&portrait=0&autoplay=1&muted=1`}
                    title={section.title}
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
              ) : section.youtubeId ? (
                <div className="w-full aspect-video mt-8 rounded overflow-hidden bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${section.youtubeId}?rel=0`}
                    title={section.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
              ) : section.sectionVideo ? (
                <video
                  src={section.sectionVideo}
                  poster={section.videoPoster}
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-auto mt-8 rounded bg-black"
                />
              ) : section.image ? (
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full h-auto mt-8 rounded"
                />
              ) : null}
              {section.mediaCaption && (
                <p className="font-display text-sm text-muted-foreground mt-3 italic">
                  {section.mediaCaption}
                </p>
              )}
              {section.extras?.map((extra, ei) => {
                const imageOnly = !extra.heading && !extra.content && !extra.sectionVideo && extra.image;
                return (
                <div key={ei} className={imageOnly ? "mt-4" : "mt-16"}>
                  {extra.heading && (
                    <h3 className="font-body text-[20px] text-foreground leading-snug mb-3">
                      {extra.heading}
                    </h3>
                  )}
                  {extra.content && (
                    <div className="font-body text-muted-foreground leading-relaxed text-base space-y-4">
                      {extra.content.split("\n\n").map((para, idx) => (
                        <p key={idx}>{para}</p>
                      ))}
                    </div>
                  )}
                  {extra.sectionVideo ? (
                    <video
                      src={extra.sectionVideo}
                      poster={extra.videoPoster}
                      controls
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      className="w-full h-auto mt-8 rounded bg-black"
                    />
                  ) : extra.image ? (
                    <img src={extra.image} alt={extra.heading || ""} className={`w-full h-auto rounded ${imageOnly ? "" : "mt-8"}`} />
                  ) : (
                    <div className="w-full aspect-video bg-muted mt-8 rounded flex items-center justify-center">
                      <span className="font-mono text-xs text-muted-foreground">Placeholder image</span>
                    </div>
                  )}
                </div>
                );
              })}
            </section>
          ))}
        </main>
      </div>
    </div>
  );
};

export default WorkDetail;
