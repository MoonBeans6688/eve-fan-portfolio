const photos = [
  {
    src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=80",
    label: "HI!",
  },
  {
    src: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80",
    label: "spring blooms",
  },
  {
    src: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=800&q=80",
    label: "balloon festival",
  },
  {
    src: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=80",
    label: "studio time",
  },
];

const experience = [
  { org: "InsightAI", role: "Product Design Intern", date: "SUMMER 2025" },
  { org: "Xiaomi", role: "UX Design Intern", date: "SUMMER 2023" },
  { org: "Zhihu", role: "Visual Design Intern", date: "SUMMER 2021" },
];

const education = [
  { org: "University of Pennsylvania", role: "M: IPD", date: "2025–2027" },
  { org: "South China University of Tech.", role: "M.Des", date: "2023–2025" },
  { org: "Huazhong University of Sci. & Tech.", role: "Bachelor of Fine Arts", date: "2018–2022" },
];

const Contact = () => {
  return (
    <main className="pt-32 pb-12 min-h-screen">
      <div className="px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-16">
        {/* Left: Intro */}
        <div>
          <h1 className="font-display text-5xl md:text-6xl text-foreground mb-6 leading-tight">
            Hi there, I'm Eve.
          </h1>
          <p className="font-body text-base text-foreground/80 leading-relaxed mb-6 max-w-xl">
            I'm an interdisciplinary designer with a love for prototyping, storytelling, and visual craft. I study design and consumer psychology at Penn. I'm currently on a gap semester to design at{" "}
            <a
              href="https://perplexity.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="clickable underline underline-offset-2 hover:text-primary transition-colors"
            >
              InsightAI
            </a>
            .
          </p>
          <p className="font-body text-base text-foreground/80 mb-2">Outside of design I'm:</p>
          <ul className="font-body text-base text-foreground/80 space-y-1 mb-6 list-disc list-inside">
            <li>Doodling on my iPad</li>
            <li>Painting gouache plein airs</li>
            <li>Building houses in the Sims 4</li>
            <li>Cafe hopping in pursuit of tasty matcha</li>
          </ul>
          <p className="font-body text-base text-foreground/80">
            I post my work on{" "}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="clickable underline underline-offset-2 hover:text-primary transition-colors"
            >
              Twitter
            </a>{" "}
            and{" "}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="clickable underline underline-offset-2 hover:text-primary transition-colors"
            >
              Instagram
            </a>
            . Say hello at emmiwu[at]sas.upenn.edu or via{" "}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="clickable underline underline-offset-2 hover:text-primary transition-colors"
            >
              LinkedIn
            </a>
            .
          </p>
        </div>

        {/* Right: Experience + Education */}
        <div className="space-y-10">
          <section>
            <h2 className="font-display text-3xl text-foreground mb-4">Experience</h2>
            <ul className="divide-y divide-border/60">
              {experience.map((item) => (
                <li
                  key={item.org}
                  className="py-3 flex items-baseline justify-between gap-6"
                >
                  <div className="font-body text-sm text-foreground">
                    <span className="font-medium">{item.org}</span>
                    <span className="text-foreground/50"> / {item.role}</span>
                  </div>
                  <div className="font-mono text-xs text-foreground/60 whitespace-nowrap tracking-wider">
                    {item.date}
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-3xl text-foreground mb-4">Education</h2>
            <ul className="divide-y divide-border/60">
              {education.map((item) => (
                <li
                  key={item.org}
                  className="py-3 flex items-baseline justify-between gap-6"
                >
                  <div className="font-body text-sm text-foreground">
                    <span className="font-medium">{item.org}</span>
                    <span className="text-foreground/50"> / {item.role}</span>
                  </div>
                  <div className="font-mono text-xs text-foreground/60 whitespace-nowrap tracking-wider">
                    {item.date}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      {/* Photo strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1 px-1">
        {photos.map((photo, i) => (
          <div
            key={i}
            data-cursor-label={photo.label}
            className="relative aspect-[3/4] overflow-hidden bg-muted"
          >
            <img
              src={photo.src}
              alt={photo.label}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </main>
  );
};

export default Contact;
