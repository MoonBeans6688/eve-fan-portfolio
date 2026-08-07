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
      <div className="flex flex-col gap-6 px-6 md:px-12">
        {projects.map((work, i) => (
          <WorkCard
            key={work.slug}
            work={work}
            index={i}
            fullWidth
            fixedPlaceholder
            comingSoon={work.slug === "insight-ai" || work.slug === "penn-medicine" || work.slug === "tiktok"}
          />
        ))}
      </div>
    </section>
  );
};

export default WorksSection;
