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
    ...(project?.sections.map((s) => ({ id: s.id, label: s.title.toUpperCase() })) ?? []),
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
    <div className="min-h-screen bg-background">
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
                  className={`clickable font-mono text-xs text-left py-1 transition-colors ${
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
          <section id="overview" className="px-8 md:px-16 py-16 border-b border-border">
            <h1 className="font-display text-3xl md:text-5xl text-foreground mb-4 leading-tight">
              {project.title}
            </h1>
            {project.tagline && (
              <p className="font-body text-base md:text-lg text-muted-foreground mb-10 leading-relaxed">
                {project.tagline}
              </p>
            )}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {project.meta.map((m) => (
                <div key={m.label}>
                  <p className="font-mono text-xs uppercase tracking-wider mb-2 font-medium text-[#4d4afc]">
                    {m.label}
                  </p>
                  <p className="font-body text-sm text-foreground whitespace-pre-line leading-relaxed">
                    {m.value}
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
                className="font-mono text-xs uppercase tracking-wider mb-6 font-medium"
                style={{ color: '#4D4AFC' }}
              >
                {section.title.toUpperCase()}
              </h2>
              {section.heading && (
                <h3 className="font-body text-[20px] text-foreground leading-snug mb-3" dangerouslySetInnerHTML={{ __html: section.heading }} />
              )}
              <p className="font-body text-muted-foreground leading-relaxed text-lg">
                {section.content}
              </p>
              {section.image ? (
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full h-auto mt-8 rounded"
                />
              ) : (
                <div className="w-full aspect-video bg-muted mt-8 rounded flex items-center justify-center">
                  <span className="font-mono text-xs text-muted-foreground">Placeholder image</span>
                </div>
              )}
            </section>
          ))}
        </main>
      </div>
    </div>
  );
};

export default WorkDetail;
