import WorkCard from "./WorkCard";
import { projects } from "@/data/projects";

const WorksSection = () => {
  const [featured, ...rest] = projects;
  const leftCol = rest.filter((_, i) => i % 2 === 0);
  const rightCol = rest.filter((_, i) => i % 2 !== 0);

  return (
    <section id="selected-works" className="pb-24">
      <div className="mb-10 px-6 md:px-12">
        <h2 className="font-display text-3xl md:text-4xl text-foreground">
          Selected Works
        </h2>
      </div>
      {featured && (
        <div className="mb-6">
          <WorkCard work={featured} index={0} fullWidth />
        </div>
      )}
      <div className="flex flex-col md:flex-row gap-6 px-6 md:px-12">
        <div className="flex-1 flex flex-col gap-6">
          {leftCol.map((work, i) => (
            <WorkCard key={work.slug} work={work} index={i * 2 + 1} />
          ))}
        </div>
        <div className="flex-1 flex flex-col gap-6">
          {rightCol.map((work, i) => (
            <WorkCard key={work.slug} work={work} index={i * 2 + 2} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorksSection;
