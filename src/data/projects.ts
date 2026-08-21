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
  embedUrl?: string;
  embedLabel?: string;
  embedHeight?: number;
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
  headerVimeoId?: string;
  embedUrl?: string;
  embedLabel?: string;
  embedHeight?: number;
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
    slug: "tiktok",
    title: "TikTok",
    tagline:
      "Rethinking Effect House from node-based workflows to an AI-native creation experience.",
    date: "INTERN 2026",
    tag: "",
    thumbnail: "/__l5e/assets-v1/514581e8-99c1-4cd3-9c63-9800ecdb35ee/tiktok-cover.png",
    span: "wide",
    meta: [
      { label: "TIMELINE", value: "2026" },
      { label: "ROLE", value: "Product Designer" },
      { label: "TEAM", value: "TikTok" },
      { label: "SKILLS", value: "Product Design" },
    ],
    sections: [
      { id: "brief", title: "BRIEF", heading: "Heading placeholder", content: "Section content placeholder. Add your case study content here." },
      { id: "insights", title: "Problem", heading: "Heading placeholder", content: "Section content placeholder. Add your case study content here." },
      { id: "the-problem", title: "Research", heading: "Heading placeholder", content: "Section content placeholder. Add your case study content here." },
      { id: "solution", title: "Key Insights", heading: "Heading placeholder", content: "Section content placeholder. Add your case study content here." },
      { id: "the-outcome", title: "Design Strategy", heading: "Heading placeholder", content: "Section content placeholder. Add your case study content here." },
    ],
  },
  {
    slug: "insight-ai",
    title: "Insight AI",
    tagline:
      "From one-way generation to infinite-canvas workflows for scalable e-commerce image creation.",
    overviewTagline: "Redesigning AI generation for e-commerce production. From one-way generation to template-based infinite-canvas workflows.",
    date: "INTERN 2025",
    tag: "",
    thumbnail: "/images/insight-ai.gif",
    video: "/videos/insight-ai-home.mp4",
    span: "wide",
    heroVideo: "/videos/insight-ai-hero.mp4",
    meta: [
      { label: "TIMELINE", value: "APR 2025 - AUG 2025" },
      { label: "ROLE", value: "Product Design Intern" },
      { label: "MY FOCUS", value: "AI interaction logic\nTemplate workflows\nStructured inputs\nVisual crafting" },
      { label: "TEAM", value: "Lead Product Manager\nLead Designer\nDevelopers" },
    ],
    sections: [
      {
        id: "overview",
        title: "PROJECT OVERVIEW",
        heading: "The problem was not image generation. It was production control.",
        content: "Insight AI's original product let e-commerce merchants generate product images through a one-way pipeline: provide inputs, generate, revise, generate again. The system worked for quick, one-off images—but it broke down when users needed to scale production across multiple products, compare variations, or reuse workflows.\n\nMy role was to redesign the core generation experience—moving from a linear, single-output model to a template-based infinite-canvas system that gave users structure without sacrificing creative freedom.",
        image: "/images/insight-ai/slide-02.jpg",
      },
      {
        id: "original-product",
        title: "ORIGINAL PRODUCT",
        heading: "Original system: one-way generation",
        content: "The existing tool followed a rigid linear flow: users uploaded a product photo, selected a scene template, hit generate, and received a single output. If the result wasn't right, the only option was to revise parameters and generate again—with no way to compare outputs side by side, preserve context across iterations, or reuse a successful workflow on a different product.",
        image: "/images/insight-ai/slide-04.jpg",
      },
      {
        id: "target-users",
        title: "TARGET USERS",
        heading: "Who we were designing for",
        content: "The product initially served e-commerce merchants with no design background who needed efficient, lightweight image production. As the product matured, the target expanded to e-commerce operators and operator-designers—users who needed more structure than open prompting, more flexibility than rigid preset tools, and better support for comparing, refining, and reusing outputs.",
        image: "/images/insight-ai/slide-06.jpg",
      },
      {
        id: "insight-freedom",
        title: "INSIGHT: FREEDOM",
        heading: "AI eCommerce imaging requires freedom.",
        content: "Through user research and workflow analysis, we identified four principles that the canvas-based system needed to support:\n\nOrganize Inputs Spatially — users needed to lay out source materials (product photos, reference images, text prompts) in a way that reflected their mental model, not a fixed form.\n\nKeep The Process Visible — every step of generation should remain on canvas as a visible, reusable node rather than hidden behind a loading screen.\n\nCompare Outputs Side By Side — visual comparison works better side by side than one image at a time. Users needed to evaluate multiple directions simultaneously.\n\nPreserve Context Across Media And Iterations — a workflow that connects text, image, and video nodes maintains context that a linear pipeline loses between each generation cycle.",
        image: "/images/insight-ai/slide-08.jpg",
      },
      {
        id: "solution-stage-1",
        title: "SOLUTION: STAGE 1",
        heading: "Key interaction decisions",
        content: "The first stage of the redesign centered on three structural decisions that shaped the entire canvas experience:\n\nVisible nodes, not hidden steps — Users needed to see reusable workflow content, not just final results. Every input, generation step, and output became a persistent node on canvas.\n\nParallel outputs, not version history alone — Visual comparison works better side by side than one image at a time. The system renders multiple outputs as sibling nodes rather than stacking them in a timeline.\n\nShared source + editable branches — Users could keep one product source while exploring multiple directions. This let them branch a workflow without duplicating the entire setup.",
        image: "/images/insight-ai/slide-09.jpg",
        extras: [
          {
            heading: "Design Execution",
            content: "The canvas system supports four base node types (text, image, video, audio) and a growing set of tool nodes (pose generation, HD upscaling, HD video, image segmentation, image editor, multi-angle generation, and image expansion). Each node type has a distinct visual identity and connection logic. Colored connection lines indicate different data flows between nodes.",
            image: "/images/insight-ai/slide-10.jpg",
          },
        ],
      },
      {
        id: "insight-constraints",
        title: "INSIGHT: CONSTRAINTS",
        heading: "AI eCommerce imaging requires constraints.",
        content: "Freedom alone wasn't enough. As we expanded to serve operator-designers, we discovered that professional e-commerce production requires structured starting points—not blank canvases. Users producing content across categories like cosmetics, jewelry, fashion, and 3C electronics needed workflows that encoded domain-specific knowledge: which model poses work for skincare, what lighting suits product close-ups, how to structure a lookbook shoot.\n\nThe insight was that templates should not be rigid presets, but editable workflow entry points that give users a head start while preserving the canvas's flexibility.",
        image: "/images/insight-ai/slide-11.jpg",
      },
      {
        id: "solution-stage-2",
        title: "SOLUTION: STAGE 2",
        heading: "Templates as Workflow Entry Points",
        content: "In Stage 2, I designed a template system that bridges the gap between freedom and structure. Each template is a pre-built canvas workflow—complete with input nodes, logic nodes, and output nodes—that users can load, customize, and extend.\n\nRather than filling out a form and hoping for the best, users enter a workflow that already encodes best practices for their specific use case (e.g., cosmetics model photography). They can then modify any node, swap inputs, adjust prompts, or branch the workflow in new directions.",
        image: "/images/insight-ai/slide-12.jpg",
        extras: [
          {
            heading: "How I made this template: Input Layer",
            content: "The input layer structures what the user provides: scene information (style, background, mood), product information (type, application area, texture), a product photo upload, and an optional model photo upload or generation. Each input feeds into downstream nodes through typed connections, ensuring the generation logic receives clean, structured data.",
            image: "/images/insight-ai/slide-13.jpg",
          },
          {
            heading: "Logic Layer",
            content: "The logic layer is where AI does its work. A key node here is the \"model usage inspiration generator\"—it takes structured inputs from the scene and product information nodes and produces multiple detailed prompt variations describing how the model should interact with the product. This layer is what makes template outputs feel intentional rather than random.",
            image: "/images/insight-ai/slide-14.jpg",
          },
          {
            heading: "Output Layer",
            content: "The output layer renders multiple final images in parallel, each driven by a different prompt variation from the logic layer. Users see four or more outputs simultaneously, can compare directly on canvas, and select or refine from there. The entire workflow—from input to output—stays visible and editable.",
            image: "/images/insight-ai/slide-15.jpg",
          },
          {
            heading: "Key Design Decision: Structured Input meets AI-Assisted Input",
            content: "A critical design decision was how to balance structured form inputs with AI-generated content within the same node system. On the left, structured input nodes let users fill in specific fields (scene style, product type, application area) that constrain the generation. On the right, AI-assisted nodes use those structured inputs to auto-generate detailed prompts—giving users a strong starting point they can review and edit, rather than requiring them to write prompts from scratch.",
            image: "/images/insight-ai/slide-16.jpg",
          },
        ],
      },
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
        headerVimeoId: "1185410960",
        image: "/images/dear-remains-memory-box.jpg",
        extras: [
          { heading: "Flow 2: 3D Scan", content: "Use your phone to 3D-scan meaningful items and upload them as \"digital relics.\" Each scan can be enriched with text, images, and audio so the object carries its full story forward, even when the physical item fades, breaks, or is lost.", image: "/images/dear-remains-3d-scan.jpg" },
          { heading: "Flow 3: Kin Galaxy", content: "Kin Galaxy is a digital family graveyard reimagined as a gentle, living sky. Each star represents a late family member or shared memory, where relatives can gather and remember together.", image: "/images/dear-remains-kin-galaxy.jpg" },
        ],
      },
      { id: "validation", title: "Validation & Reflection", heading: "What testing validated", content: "Users responded positively to the emotional value of 3D scanning, personalized memory cards, and the idea of a gentle digital memorial space. The concept resonated most when it helped users preserve memories without adding emotional pressure.\n\n### What I learned\n\nThe testing also showed that designing memorial products is not only about emotion, but about clarity and control. In sensitive contexts, AI can support expression, but it should never replace the user in making sense of loss." },
    ],
  },
  {
    slug: "penn-medicine",
    title: "Penn Medicine Design System",
    tagline:
      "Turning fragmented clinical tools into a coherent system that aligns teams and makes innovation visible.",
    overviewTagline: "An AI-native workflow and design system for cross-functional product collaboration.",
    date: "Client project 2026",
    tag: "",
    thumbnail: "/images/penn-medicine-cover.jpg",
    span: "wide",
    heroImage: "/images/penn-medicine-cover.jpg",
    meta: [
      { label: "TIMELINE", value: "2026" },
      { label: "ROLE", value: "Product Designer" },
      { label: "TEAM", value: "Penn Medicine Center for Health Care\nTransformation & Innovation (CHTI)" },
      { label: "SKILLS", value: "Design Systems\nWorkflow Design\nStakeholder Alignment\nAI-Assisted Prototyping" },
    ],
    sections: [
      {
        id: "brief",
        title: "PROJECT OVERVIEW",
        heading: "Penn Medicine: Rebuilding Alignment",
        content: "Penn Medicine's Center for Health Care Transformation & Innovation (CHTI) builds a portfolio of internal digital products—Coordn8, Switchboard, Hero, PickIt, and Fulfill—used across clinical, operations, and administrative teams. As the portfolio grew, so did visual and structural inconsistency between apps.\n\nWe were brought in to address this fragmentation, but the real problem turned out to run deeper than surface-level visuals. The solution combined two parts: an alignment process for how the team works together, and an AI-assisted design system for how the apps look and feel cohesive.",
        image: "/images/penn-medicine/slide-02.jpg",
      },
      {
        id: "problem",
        title: "PROBLEM",
        heading: "How might we create a unified, recognizable experience across CHTI's digital products that signals quality and trust?",
        content: "This was the brief we were initially asked to address. On the surface, it looked like a visual design problem: five different apps, five different visual languages, no shared sense that they came from the same team.",
      },
      {
        id: "research-insights",
        title: "RESEARCH INSIGHTS",
        heading: "Conversations with stakeholders surfaced three root causes behind CHTI's fragmentation.",
        content: "Mindset — Perceiving CHTI products as temporary creates a barrier to internal iteration.\n\nWorkflow — The absence of a standardized framework has created a structural void, forcing individuals to develop their own standards that compete and generate friction.\n\nAwareness — CHTI is experiencing a visibility gap that is capping its potential for impact.",
        image: "/images/penn-medicine/slide-04.jpg",
      },
      {
        id: "workflow-analysis",
        title: "WORKFLOW ANALYSIS",
        heading: "The workflow you'd imagine vs. the current messy reality",
        content: "The imagined workflow is clean: product managers define the vision, designers make buildable prototypes, developers build, stakeholders review, feedback loops close the circle.\n\nThe actual workflow looked nothing like that. Transformation managers and designers faced unstructured iteration, unclear feedback, and stakeholders jumping in at early stages without shared context. AI tools were sometimes making decisions without oversight, developers had to keep re-explaining context, and feedback from stakeholders often arrived too late to be useful.",
        image: "/images/penn-medicine/slide-05.jpg",
      },
      {
        id: "reframing",
        title: "PROBLEM REFRAMING",
        heading: "Fixing the visuals without fixing the alignment challenges would only be a bandage—not a long-lasting solution.",
        content: "We were asked to address visual inconsistency: create visual consistency across CHTI's portfolio of apps.\n\nWhat we discovered was that there is no visible consistency because there are internal alignment issues stopping the teams from working together well. Visual fragmentation was a symptom, not the disease.\n\n### New HMW Question\n\nHow might we create a shared way of working that helps CHTI teams align earlier, collaborate across roles, and turn ideas into buildable product concepts?",
      },
      {
        id: "solution",
        title: "SOLUTION",
        heading: "To leverage the team's expertise, CHTI needs to drive alignment and create consistency.",
        content: "The solution has two halves that reinforce each other: an Alignment Process for how individuals work together, and an AI-Assisted Design System for how apps look cohesive.",
        image: "/images/penn-medicine/slide-08.jpg",
        extras: [
          {
            heading: "This solution ensures that each role can add its value and leads to more efficient collaboration.",
            content: "No clear process → Structured 6-step alignment flow\n\nUnclear role & constant stepping on toes → Ownership defined at every stage\n\nNo shared frame of reference → Single source of truth that captures all research and decisions\n\nStakeholders not consulted often enough → Structured check-ins that re-involve stakeholders at every step\n\nAI overstepping → Humans lead decision making, AI executes\n\nEvery app looks different → One unified CHTI design system",
            image: "/images/penn-medicine/slide-09.jpg",
          },
        ],
      },
      {
        id: "solution-alignment-process",
        title: "SOLUTION: ALIGNMENT PROCESS",
        heading: "Every step defines who leads, why it matters, and who needs to be aligned.",
        content: "The alignment process is a six-step playbook, built to foster productive collaboration between transformation managers and software development. Humans lead and make the decisions—AI is a powerful tool to help execute.\n\n1. Storyboarding — Understand the user's journey before designing anything.\n2. Page Planning — Define what the app needs to do, page by page.\n3. Layouts & Interactions — Sketch the structure of each page before anything is built.\n4. High-Fidelity Wireframing with AI — Turn sketches into polished, branded screens.\n5. Usability Testing & Iteration — Bring end users in early to shape the final product.\n6. Handoff — Set software up for success before the full build begins.",
        image: "/images/penn-medicine/slide-10.jpg",
        extras: [
          {
            heading: "Step 1 of 6: Storyboarding",
            content: "Led by: Transformation Managers\n\nWhy this step matters: Storyboarding forces you to genuinely understand the person who will use your app—what they do, in what order, and what they're thinking at each stage. It's the difference between an app that fits naturally into someone's day and one they have to work around.\n\nWhat you'll produce: a current-state storyboard for each type of user, and a future-state storyboard showing how your solution fits into their flow.\n\nHow to check your work — Software: talk through the solution to understand how it will be delivered. Clients: share your storyboards and revise based on what you hear.",
            image: "/images/penn-medicine/slide-11.jpg",
          },
        ],
      },
      {
        id: "solution-design-system",
        title: "SOLUTION: DESIGN SYSTEM",
        heading: "The design system provides a shared visual language for every CHTI product.",
        content: "The CHTI design system defines typography (IBM Plex Serif and IBM Plex Sans), a shared color palette, an icon system, and reusable components—cards, navigation, status indicators, buttons—so every app draws from the same visual vocabulary instead of reinventing it.",
        image: "/images/penn-medicine/slide-12.jpg",
        extras: [
          {
            heading: "AI builders like Claude know our design system.",
            content: "We built a workflow where Claude Design reads the CHTI Figma design system file (.fig) and understands its components, spacing, type scale, and color rules. Claude then generates a machine-readable version of the design system that can be reused across future projects—so every new AI-assisted build starts from the same foundation instead of drifting from it.",
            image: "/images/penn-medicine/slide-13.jpg",
          },
          {
            heading: "Claude can translate any plans into CHTI-branded outputs.",
            content: "Two examples from the Coordn8 platform: the existing app screen (left) versus the same screen rebuilt using the CHTI design system (right)—in one case redesigned by our team, and in the other, built directly by Claude using the design system as its guide.",
            image: "/images/penn-medicine/slide-14.jpg",
          },
          {
            heading: "",
            content: "",
            image: "/images/penn-medicine/slide-15.jpg",
          },
          {
            heading: "Shipped: PickIt, rebuilt on the CHTI design system",
            content: "PickIt is CHTI's live supply-ordering and fulfillment platform for Penn Medicine units. This is the real, deployed interface—rebuilt using the design system above and currently in use by clinical, materials management, QA, and admin roles across facilities. Explore it below: switch roles and modules using the interactive controls to see how the same design system adapts across different workflows.",
            embedUrl: "/prototypes/pickit.html",
            embedLabel: "PickIt — live production interface",
            embedHeight: 760,
          },
        ],
      },
      {
        id: "reflection",
        title: "REFLECTION",
        heading: "Designing for AI-Native Collaboration",
        content: "Healthcare — Healthcare is a highly complex field where team members often come from diverse backgrounds; therefore, establishing a mature workflow is essential to optimizing team collaboration.\n\nAI Usage — AI only truly enhances collaborative efficiency when it is embedded within a well-defined workflow.\n\nAI Results — Output quality depends on input structure. In an era of effortless generation, the real value lies in framing the problem and setting the boundaries.\n\nAI Purpose — AI serves as \"participation infrastructure,\" driving the democratization of collaboration across the organization.",
      },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
