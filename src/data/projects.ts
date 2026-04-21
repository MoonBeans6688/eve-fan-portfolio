export interface ProjectMeta {
  label: string;
  value: string;
}

export interface SectionExtra {
  heading?: string;
  content?: string;
  image?: string;
  sectionVideo?: string;
  videoPoster?: string;
}

export interface ProjectSection {
  id: string;
  title: string;
  heading?: string;
  content: string;
  caption?: string;
  mediaCaption?: string;
  image?: string;
  sectionVideo?: string;
  videoPoster?: string;
  youtubeId?: string;
  vimeoId?: string;
  extras?: SectionExtra[];
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
    video: "/videos/insight-ai-home.mp4",
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
    video: "/videos/the-jar-home.mp4",
    poster: "/videos/the-jar-poster.jpg",
    span: "tall",
    sticker: "/images/winner-sticker.png",
    heroVideo: "/videos/the-jar-hero.mp4",
    meta: [
      { label: "TIMELINE", value: "MAR 8 - MAR 10, 2026\n3 days design-a-thon" },
      { label: "ROLE", value: "Concept Development\nProduct Designer\nVisual Design" },
      { label: "TEAM", value: "Eve Fan\nMegan Winarta\nJyotiraditya Ingawale" },
      { label: "SKILLS", value: "Concept Framing\nInteraction Design\nVisual Design\nHigh-Fidelity Prototyping\n*Video Narrative & Direction" },
    ],
    sections: [
      { id: "brief", title: "BRIEF", heading: "Welcome to The Jar", content: "A speculative tool that turns impulsive late-night messages into a moment of reflection, preserving emotional honesty while delaying consequence.", caption: "Enjoy our concept video! ↓", vimeoId: "1184660263", mediaCaption: "Written, Directed, and Filmed by Eve Fan" },
      { id: "insights", title: "Problem", heading: "What if late-night honesty didn't have to have negative consequences?", content: "Most people don’t regret having feelings. They regret hitting send too soon. A drunk text is rarely just a typo problem, it’s a timing problem, a judgment problem, and sometimes a truth problem.", image: "/images/the-jar-problem.png" },
      { id: "the-problem", title: "CONCEPT", heading: "A New Sense of Clarity", content: "We saw drunk texting as more than a bad decision. It revealed a gap between emotional honesty and sound judgment—and The Jar was designed to hold space between the two.", image: "/images/the-jar-clarity.png" },
      { 
        id: "solution", 
        title: "SOLUTION", 
        heading: "1. Seal the message", 
        content: "When Sealing Mode is on, messages with a high risk of regret are intercepted before they leave the phone and stored in the Jar. Rather than deleting the impulse, the product preserves it—treating the message as something worth revisiting, not something to be ashamed of.",
        sectionVideo: "/videos/jar-seal.mp4",
        extras: [
          { heading: "2. Return to it later", content: "Later, in Sober Review, users can revisit what they wrote with more distance and better judgment. They can send the message as-is, revise it with clearer intent, or simply let the moment pass—turning reaction into reflection.", sectionVideo: "/videos/jar-return.mp4" },
          { heading: "3. Understand what was underneath", content: "Beyond storing the message, The Jar also helps users reflect on what may have been driving it. Through Underneath, AI-generated prompts surface possible emotions, motivations, and tensions behind the text—not to define the truth for the user, but to support a more honest review later.", sectionVideo: "/videos/jar-understand.mp4" },
        ],
      },
      { id: "the-outcome", title: "work without ai", heading: "On control, craft, and AI", content: "Working on The Jar made me think more critically about where AI fits into design practice. Tools like Figma Make are compelling because they promise speed, especially in early prototyping. But in my experience, speed is not the same as control. When a project depends on a specific aesthetic language, subtle interaction pacing, and a strong emotional atmosphere, current AI tools can flatten the very qualities that make the work feel intentional.\n\nWe experimented with Figma Make, but the complexity of our file and the specificity of our visual system made the results difficult to use. Rather than letting the tool reinterpret the design for us, we chose to build the prototype manually. In a hackathon setting, that was a tradeoff: we gave up some efficiency in order to preserve coherence.\n\nWhat I took away from that decision is not that AI has no place in design, but that its value is highly dependent on where it enters the workflow. I find it most useful as a collaborator around the margins—supporting synthesis, iteration, or selective production tasks—while the core concept, structure, and aesthetic judgment still need to come from the designer." },
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
    video: "/videos/dear-remains-home.mp4",
    span: "normal",
    accentColor: "#9b87f5",
    heroImage: "/images/dear-remains-cover.jpg",
    meta: [
      { label: "TIMELINE", value: "JUN 2025 - AUG 2025" },
      { label: "ROLE", value: "Product Designer" },
      { label: "TEAM", value: "Eve Fan\nHongrui Jiang" },
      { label: "SKILLS", value: "Problem framing\nQualitative research\nSystems thinking\nInteraction design\nVisual design" },
    ],
    sections: [
      { id: "brief", title: "BRIEF", heading: "How might digital tools help bereaved people move from painful decluttering to sustainable remembrance?", content: "Dear Remains is a digital memorial companion that helps bereaved people 3D-scan a loved one's belongings and turn them into lasting digital memories.", vimeoId: "1184683166" },
      { id: "insights", title: "Problem", heading: "Sorting belongings is practical, but grief is <span class=\"font-display italic\">emotional.</span>", content: "", image: "/images/dear-remains-insights.jpg" },
      { id: "the-problem", title: "Research", heading: "Understanding people behind bereavement decluttering", content: "By interviewing people with real experience in sorting through the belongings of the deceased, we sought to understand their behaviors, emotions, and stress before, during, and after the organizing process.\n\nThe research also revealed to me that direct organizers and their companions face different responsibilities, forms of expression, and emotional burdens.", extras: [{ image: "/images/dear-remains-research-1.png" }, { image: "/images/dear-remains-research-2.png" }] },
      { id: "solution", title: "Key Insights", heading: "Grief support needs gentleness, control, and continuity", content: "Research showed that bereavement decluttering needs a gentle start, emotional breathing room during sorting, and private rituals that can continue over time. In response, Dear Remains translates these needs into a memorial system built around 3D object digitization, AI-assisted storytelling, and a private family space for lasting remembrance.", image: "/images/dear-remains-insights-diagram.png" },
      { 
        id: "the-outcome", 
        title: "solution", 
        heading: "Flow 1: Memory Box", 
        content: "Memory Box lets you explore digitized keepsakes and the stories attached to them — photos, voice notes, and written memories that turn everyday objects into small, private memorials you can revisit anytime.", 
        image: "/images/dear-remains-memory-box.jpg",
        extras: [
          { heading: "Flow 2: 3D Scan", content: "Use your phone to 3D-scan meaningful items and upload them as \"digital relics.\" Each scan can be enriched with text, images, and audio so the object carries its full story forward, even when the physical item fades, breaks, or is lost.", image: "/images/dear-remains-3d-scan.jpg" },
          { heading: "Flow 3: Kin Galaxy", content: "Kin Galaxy is a digital family graveyard reimagined as a gentle, living sky. Each star represents a late family member or shared memory, where relatives can gather and remember together.", image: "/images/dear-remains-kin-galaxy.jpg" },
        ],
      },
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
