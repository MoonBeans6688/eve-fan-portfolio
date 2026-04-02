import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const WorkDetail = () => {
  const { id } = useParams();

  return (
    <main className="pt-24 px-6 md:px-12 pb-24 max-w-4xl mx-auto">
      <Link
        to="/"
        className="clickable inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 mb-12"
      >
        <ArrowLeft size={14} />
        Back to works
      </Link>
      <h1 className="font-display text-4xl md:text-6xl text-foreground mb-6">
        Project: {id}
      </h1>
      <p className="font-body text-muted-foreground text-lg leading-relaxed mb-12">
        This is where the detailed case study will live. Upload your content and media to customize this page.
      </p>
      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
        <span className="font-mono text-sm text-muted-foreground">Project media placeholder</span>
      </div>
    </main>
  );
};

export default WorkDetail;
