import WorkCard from "./WorkCard";
import { projects } from "@/data/projects";

const WorksSection = () => {
  const leftCol = projects.filter((_, i) => i % 2 === 0);
  const rightCol = projects.filter((_, i) => i % 2 !== 0);

  return (
    <section id="selected-works" className="pb-24 px-6 md:px-12">
      <div className="mb-10">
        <h2 className="font-display text-3xl md:text-4xl text-foreground">
          Selected Works
        </h2>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 flex flex-col gap-6">
          {leftCol.map((work, i) => (
            <WorkCard key={work.slug} work={work} index={i * 2} />
          ))}
        </div>
        <div className="flex-1 flex flex-col gap-6">
          {rightCol.map((work, i) => (
            <WorkCard key={work.slug} work={work} index={i * 2 + 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorksSection;
