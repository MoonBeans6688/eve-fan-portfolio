import { Link } from "react-router-dom";

export interface WorkItem {
  id: string;
  title: string;
  description: string;
  date: string;
  tag: string;
  thumbnail: string;
}

interface WorkCardProps {
  work: WorkItem;
  index: number;
}

const WorkCard = ({ work, index }: WorkCardProps) => {
  return (
    <Link
      to={`/work/${work.id}`}
      className="clickable group block"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative overflow-hidden rounded-lg bg-muted aspect-[16/9] mb-4 transition-transform duration-300 group-hover:scale-[0.985]">
        <img
          src={work.thumbnail}
          alt={work.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />
      </div>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-display text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors duration-200 mb-1">
            {work.title}
          </h3>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            {work.description}
          </p>
        </div>
        <div className="text-right shrink-0">
          <span className="font-mono text-xs text-muted-foreground block">{work.date}</span>
          <span className="font-mono text-xs text-primary mt-1 block">{work.tag}</span>
        </div>
      </div>
    </Link>
  );
};

export default WorkCard;
