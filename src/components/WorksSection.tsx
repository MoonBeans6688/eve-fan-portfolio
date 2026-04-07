import WorkCard, { WorkItem } from "./WorkCard";

const WORKS: WorkItem[] = [
  {
    id: "insight-ai",
    title: "Insight AI",
    description: "An AI-powered e-commerce image generator that turns product shots into studio-quality visuals.",
    date: "INTERN 2025",
    tag: "",
    thumbnail: "/images/insight-ai.gif",
    span: "wide",
  },
  {
    id: "project-2",
    title: "Clarity — Task Management Reimagined",
    description: "A minimal productivity tool designed for creative professionals who think in systems.",
    date: "2024",
    tag: "Award Winner",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    span: "tall",
  },
  {
    id: "project-3",
    title: "Wayfinder — Urban Navigation",
    description: "Helping city dwellers navigate public transit with confidence and calm.",
    date: "2024",
    tag: "Personal Project",
    thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&q=80",
    span: "wide",
  },
  {
    id: "project-4",
    title: "Greenhouse — Sustainability Dashboard",
    description: "Making environmental impact data accessible and actionable for small businesses.",
    date: "2023",
    tag: "Internship @ Figma",
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80",
    span: "normal",
  },
  {
    id: "project-5",
    title: "Mosaic — Generative Art Tool",
    description: "A browser-based tool for creating algorithmic art with intuitive visual controls.",
    date: "2023",
    tag: "Side Project",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80",
    span: "wide",
  },
  {
    id: "project-6",
    title: "Pulse — Health Tracker",
    description: "Simplifying personal health data into actionable daily insights.",
    date: "2022",
    tag: "Hackathon",
    thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
    span: "normal",
  },
];

const WorksSection = () => {
  return (
    <section className="pb-24 px-6 md:px-12">
      <div className="mb-10">
        <h2 className="font-display text-3xl md:text-4xl text-foreground">
          Selected Works
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {WORKS.map((work, i) => (
          <WorkCard key={work.id} work={work} index={i} />
        ))}
      </div>
    </section>
  );
};

export default WorksSection;
