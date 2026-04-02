const Contact = () => {
  return (
    <main className="pt-32 px-6 md:px-12 pb-24 min-h-screen flex flex-col justify-center max-w-2xl">
      <h1 className="font-display text-5xl md:text-7xl text-foreground mb-8">
        Let's talk
      </h1>
      <div className="space-y-4">
        <a
          href="mailto:hello@evefan.com"
          className="clickable font-mono text-sm text-muted-foreground hover:text-primary transition-colors duration-200 block"
        >
          hello@evefan.com
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="clickable font-mono text-sm text-muted-foreground hover:text-primary transition-colors duration-200 block"
        >
          LinkedIn ↗
        </a>
      </div>
    </main>
  );
};

export default Contact;
