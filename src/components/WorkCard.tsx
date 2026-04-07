import { Link } from "react-router-dom";

export interface WorkItem {
  id: string;
  title: string;
  description: string;
  date: string;
  tag: string;
  thumbnail: string;
  span: 'wide' | 'tall' | 'normal';
}

interface WorkCardProps {
  work: WorkItem;
  index: number;
}

const spanClasses: Record<WorkItem['span'], string> = {
  wide: 'col-span-1 md:col-span-2',
  tall: 'col-span-1 md:col-span-2 md:row-span-2',
  normal: 'col-span-1',
};

const aspectClasses: Record<WorkItem['span'], string> = {
  wide: 'aspect-[16/9]',
  tall: 'aspect-[3/4]',
  normal: 'aspect-square',
};

const WorkCard = ({ work, index }: WorkCardProps) => {
  return (
    <Link
      to={`/work/${work.id}`}
      className={`clickable group block ${spanClasses[work.span]}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className={`relative overflow-hidden bg-muted ${aspectClasses[work.span]} transition-transform duration-300`}>
        <img
          src={work.thumbnail}
          alt={work.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
      </div>
      <div className="px-4 py-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-base md:text-lg text-foreground group-hover:text-primary transition-colors duration-200 leading-tight mb-0.5 truncate">
              {work.title}
            </h3>
            <p className="font-body text-xs text-muted-foreground leading-relaxed line-clamp-2">
              {work.description}
            </p>
          </div>
          <div className="text-right shrink-0">
            <span className="font-mono text-[10px] text-muted-foreground block">{work.date}</span>
            <span className="font-mono text-[10px] text-primary mt-0.5 block">{work.tag}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WorkCard;
