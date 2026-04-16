export interface ProjectMeta {
  label: string;
  value: string;
}

export interface ProjectSection {
  id: string;
  title: string;
  heading?: string;
  content: string;
  image?: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  overviewTagline?: string;
  date: string;
  tag: string;
  thumbnail: string;
  video?: string;
  poster?: string;
  span: "wide" | "tall" | "normal";
  sticker?: string;
  heroImage?: string;
  heroVideo?: string;
  accentColor?: string;
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
      { id: "brief", title: "BRIEF", content: "Section content placeholder. Add your case study content here." },
      { id: "insights", title: "Problem", content: "Section content placeholder. Add your case study content here." },
      { id: "the-problem", title: "Research", content: "Section content placeholder. Add your case study content here." },
      { id: "solution", title: "Key Insights", content: "Section content placeholder. Add your case study content here." },
      { id: "the-outcome", title: "Design Strategy", content: "Section content placeholder. Add your case study content here." },
    ],
  },
  {
    slug: "the-jar",
    title: "The Jar",
    tagline: "An anti-drunk-texting app",
    overviewTagline: "Seal now. Decide later. Understand yourself deeper.",
    date: "FigBuild 2026 Winner",
    tag: "Most Creative",
    thumbnail: "/videos/the-jar-poster.jpg",
    video: "/videos/the-jar-preview.mp4",
    poster: "/videos/the-jar-poster.jpg",
    span: "tall",
    sticker: "/images/winner-sticker.png",
    heroVideo: "/videos/the-jar-hero.mp4",
    meta: [
      { label: "TIMELINE", value: "MAR 8 - MAR 10\n3 days design-a-thon" },
      { label: "ROLE", value: "Product Designer" },
      { label: "TEAM", value: "Eve Fan\nMegan Winarta\nJyotiraditya Ingawale" },
      { label: "SKILLS", value: "Prototyping, Interaction Design" },
    ],
    sections: [
      { id: "brief", title: "BRIEF", content: "Section content placeholder. Add your case study content here." },
      { id: "insights", title: "Problem", content: "Section content placeholder. Add your case study content here." },
      { id: "the-problem", title: "Research", content: "Section content placeholder. Add your case study content here." },
      { id: "solution", title: "Key Insights", content: "Section content placeholder. Add your case study content here." },
      { id: "the-outcome", title: "Design Strategy", content: "Section content placeholder. Add your case study content here." },
    ],
  },
  {
    slug: "dear-remains",
    title: "Dear Remains",
    tagline:
      "Turning belongings into lasting digital memories",
    date: "2025 UXDA AWARDED PROJECT",
    tag: "",
    thumbnail: "/images/dear-remains-cover.jpg",
    span: "normal",
    accentColor: "#9b87f5",
    heroImage: "/images/dear-remains-cover.jpg",
    meta: [
      { label: "TIMELINE", value: "2025" },
      { label: "ROLE", value: "Designer" },
      { label: "TEAM", value: "Eve Fan\nHongrui Jiang" },
      { label: "SKILLS", value: "Problem framing\nQualitative research\nSystems thinking\nInteraction design\nVisual design" },
    ],
    sections: [
      { id: "brief", title: "BRIEF", heading: "How might digital tools help bereaved people move from painful decluttering to sustainable remembrance?", content: "Dear Remains is a digital memorial companion that helps bereaved people 3D-scan a loved one's belongings and turn them into lasting digital memories." },
      { id: "insights", title: "Problem", heading: "Sorting belongings is practical, but grief is <span class=\"font-display italic\">emotional.</span>", content: "Section content placeholder. Add your case study content here." },
      { id: "the-problem", title: "Research", heading: "Understanding people behind bereavement decluttering", content: "By interviewing people with real experience in sorting through the belongings of the deceased, we sought to understand their behaviors, emotions, and stress before, during, and after the organizing process.\n\nThe research also revealed to me that direct organizers and their companions face different responsibilities, forms of expression, and emotional burdens." },
      { id: "solution", title: "Key Insights", heading: "Heading placeholder", content: "Section content placeholder. Add your case study content here." },
      { id: "the-outcome", title: "Design Strategy", heading: "Grief support needs gentleness, control, and continuity", content: "The hardest part for users is not the organizing process itself, but having to take action before they are emotionally ready. " },
      { id: "product-system", title: "Product System", heading: "A memorial system built around objects, stories, and care", content: "" },
      { id: "core-flow", title: "One Core Flow", heading: "From a physical belonging to a lasting digital keepsake", content: "" },
      { id: "validation", title: "Validation & Reflection", heading: "Emotional design also needs clarity", content: "User testing indicates that while participants recognize the value of 3D scanning and memory cards, they also highlighted a high barrier to entry, blurred boundaries between community and private spaces, and a strong preference for manual agency over AI-automated categorization.\n\nBased on these insights, I will further strengthen the onboarding experience, prioritize the 'Memory Box' as the primary entry point, reduce community complexity, and introduce manual categorization and batch upload capabilities." },
      
      { id: "reflection", title: "Reflection", heading: "Designing memorial products means designing emotional pacing", content: "This project made me realize that memorial product design is about much more than just content storage; it is about the ways in which users begin, pause, return to, and continue their process of remembrance.\n\nIt also gave me a clearer understanding of AI's boundaries in sensitive contexts: a system can help people express themselves, but it cannot replace a person in making sense of their loss." },
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
      { id: "brief", title: "BRIEF", heading: "Heading placeholder", content: "Section content placeholder. Add your case study content here." },
      { id: "insights", title: "Problem", heading: "Heading placeholder", content: "Section content placeholder. Add your case study content here." },
      { id: "the-problem", title: "Research", heading: "Heading placeholder", content: "Section content placeholder. Add your case study content here." },
      { id: "solution", title: "Key Insights", heading: "Heading placeholder", content: "Section content placeholder. Add your case study content here." },
      { id: "the-outcome", title: "Design Strategy", heading: "Heading placeholder", content: "Section content placeholder. Add your case study content here." },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
