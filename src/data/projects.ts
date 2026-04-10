export interface ProjectMeta {
  label: string;
  value: string;
}

export interface ProjectSection {
  id: string;
  title: string;
  content: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  date: string;
  tag: string;
  thumbnail: string;
  video?: string;
  poster?: string;
  span: "wide" | "tall" | "normal";
  sticker?: string;
  heroImage?: string;
  meta: ProjectMeta[];
  sections: ProjectSection[];
}

export const projects: Project[] = [
  {
    slug: "insight-ai",
    title: "Insight AI",
    tagline:
      "An AI-powered e-commerce image generator that turns product shots into studio-quality visuals.",
    date: "INTERN 2025",
    tag: "",
    thumbnail: "/images/insight-ai.gif",
    span: "wide",
    heroVideo: "/videos/insight-ai-hero.mp4",
    meta: [
      { label: "TIMELINE", value: "APR 2025 - AUG 2025" },
      { label: "ROLE", value: "Product Designer" },
      { label: "TEAM", value: "Insight AI design team\nMentor: Runshi Wang, Jiawei Hou" },
      { label: "SKILLS", value: "Hi-Fi prototyping" },
    ],
    sections: [
      { id: "context", title: "Context", content: "Section content placeholder. Add your case study content here." },
      { id: "insights", title: "Insights", content: "Section content placeholder. Add your case study content here." },
      { id: "the-problem", title: "The Problem", content: "Section content placeholder. Add your case study content here." },
      { id: "solution", title: "Solution", content: "Section content placeholder. Add your case study content here." },
      { id: "the-outcome", title: "The Outcome", content: "Section content placeholder. Add your case study content here." },
    ],
  },
  {
    slug: "the-jar",
    title: "The Jar",
    tagline:
      "The Jar seals your risky late-night messages before they're sent—so you can choose with a clear head and learn what you were really feeling.",
    date: "FigBuild 2026 Winner",
    tag: "Most Creative",
    thumbnail: "/videos/the-jar-poster.jpg",
    video: "/videos/the-jar-preview.mp4",
    poster: "/videos/the-jar-poster.jpg",
    span: "tall",
    sticker: "/images/winner-sticker.png",
    heroImage: "/videos/the-jar-poster.jpg",
    meta: [
      { label: "TIMELINE", value: "2026" },
      { label: "ROLE", value: "Designer & Developer" },
      { label: "TEAM", value: "FigBuild 2026" },
      { label: "SKILLS", value: "Prototyping, Interaction Design" },
    ],
    sections: [
      { id: "context", title: "Context", content: "Section content placeholder. Add your case study content here." },
      { id: "insights", title: "Insights", content: "Section content placeholder. Add your case study content here." },
      { id: "the-problem", title: "The Problem", content: "Section content placeholder. Add your case study content here." },
      { id: "solution", title: "Solution", content: "Section content placeholder. Add your case study content here." },
      { id: "the-outcome", title: "The Outcome", content: "Section content placeholder. Add your case study content here." },
    ],
  },
  {
    slug: "penn-medicine",
    title: "Penn Medicine Design System",
    tagline:
      "Turning fragmented clinical tools into a coherent system that aligns teams and makes innovation visible.",
    date: "Client project 2026",
    tag: "",
    thumbnail: "/images/penn-medicine-cover.jpg",
    span: "wide",
    heroImage: "/images/penn-medicine-cover.jpg",
    meta: [
      { label: "TIMELINE", value: "2026" },
      { label: "ROLE", value: "Product Designer" },
      { label: "TEAM", value: "Penn Medicine" },
      { label: "SKILLS", value: "Design Systems" },
    ],
    sections: [
      { id: "context", title: "Context", content: "Section content placeholder. Add your case study content here." },
      { id: "insights", title: "Insights", content: "Section content placeholder. Add your case study content here." },
      { id: "the-problem", title: "The Problem", content: "Section content placeholder. Add your case study content here." },
      { id: "solution", title: "Solution", content: "Section content placeholder. Add your case study content here." },
      { id: "the-outcome", title: "The Outcome", content: "Section content placeholder. Add your case study content here." },
    ],
  },
  {
    slug: "project-4",
    title: "Greenhouse — Sustainability Dashboard",
    tagline:
      "Making environmental impact data accessible and actionable for small businesses.",
    date: "2023",
    tag: "Internship @ Figma",
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80",
    span: "normal",
    heroImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80",
    meta: [
      { label: "TIMELINE", value: "2023" },
      { label: "ROLE", value: "Product Design Intern" },
      { label: "TEAM", value: "Figma" },
      { label: "SKILLS", value: "Dashboard Design" },
    ],
    sections: [
      { id: "context", title: "Context", content: "Section content placeholder. Add your case study content here." },
      { id: "insights", title: "Insights", content: "Section content placeholder. Add your case study content here." },
      { id: "the-problem", title: "The Problem", content: "Section content placeholder. Add your case study content here." },
      { id: "solution", title: "Solution", content: "Section content placeholder. Add your case study content here." },
      { id: "the-outcome", title: "The Outcome", content: "Section content placeholder. Add your case study content here." },
    ],
  },
  {
    slug: "project-5",
    title: "Mosaic — Generative Art Tool",
    tagline:
      "A browser-based tool for creating algorithmic art with intuitive visual controls.",
    date: "2023",
    tag: "Side Project",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80",
    span: "wide",
    heroImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80",
    meta: [
      { label: "TIMELINE", value: "2023" },
      { label: "ROLE", value: "Designer & Developer" },
      { label: "TEAM", value: "Solo" },
      { label: "SKILLS", value: "Creative Coding" },
    ],
    sections: [
      { id: "context", title: "Context", content: "Section content placeholder. Add your case study content here." },
      { id: "insights", title: "Insights", content: "Section content placeholder. Add your case study content here." },
      { id: "the-problem", title: "The Problem", content: "Section content placeholder. Add your case study content here." },
      { id: "solution", title: "Solution", content: "Section content placeholder. Add your case study content here." },
      { id: "the-outcome", title: "The Outcome", content: "Section content placeholder. Add your case study content here." },
    ],
  },
  {
    slug: "project-6",
    title: "Pulse — Health Tracker",
    tagline:
      "Simplifying personal health data into actionable daily insights.",
    date: "2022",
    tag: "Hackathon",
    thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
    span: "normal",
    heroImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
    meta: [
      { label: "TIMELINE", value: "2022" },
      { label: "ROLE", value: "Designer" },
      { label: "TEAM", value: "Hackathon Team" },
      { label: "SKILLS", value: "Health UX" },
    ],
    sections: [
      { id: "context", title: "Context", content: "Section content placeholder. Add your case study content here." },
      { id: "insights", title: "Insights", content: "Section content placeholder. Add your case study content here." },
      { id: "the-problem", title: "The Problem", content: "Section content placeholder. Add your case study content here." },
      { id: "solution", title: "Solution", content: "Section content placeholder. Add your case study content here." },
      { id: "the-outcome", title: "The Outcome", content: "Section content placeholder. Add your case study content here." },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
