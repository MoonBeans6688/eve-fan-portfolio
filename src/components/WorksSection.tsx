import WorkCard, { WorkItem } from "./WorkCard";

const WORKS: WorkItem[] = [
  {
    id: "project-1",
    title: "Redesigning the Future of Learning",
    description: "An AI-powered education platform that adapts to each student's pace and style.",
    date: "2025",
    tag: "Internship @ Google",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80",
  },
  {
    id: "project-2",
    title: "Clarity — Task Management Reimagined",
    description: "A minimal productivity tool designed for creative professionals who think in systems.",
    date: "2024",
    tag: "Award Winner",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
  },
  {
    id: "project-3",
    title: "Wayfinder — Urban Navigation",
    description: "Helping city dwellers navigate public transit with confidence and calm.",
    date: "2024",
    tag: "Personal Project",
    thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&q=80",
  },
  {
    id: "project-4",
    title: "Greenhouse — Sustainability Dashboard",
    description: "Making environmental impact data accessible and actionable for small businesses.",
    date: "2023",
    tag: "Internship @ Figma",
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80",
  },
];

const WorksSection = () => {
  return (
    <section className="px-3 md:px-4 pb-24">
      <div className="mb-12 px-1">
        <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Selected Works
        </h2>
      </div>
      <div className="flex flex-col gap-16">
        {WORKS.map((work, i) => (
          <WorkCard key={work.id} work={work} index={i} />
        ))}
      </div>
    </section>
  );
};

export default WorksSection;
