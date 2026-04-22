import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [emailState, setEmailState] = useState<"idle" | "copied">("idle");

  useEffect(() => {
    if (emailState === "copied") {
      const t = setTimeout(() => setEmailState("idle"), 2000);
      return () => clearTimeout(t);
    }
  }, [emailState]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("evefan.design@gmail.com");
    setEmailState("copied");
  };

  return (
    <footer className="bg-foreground text-background px-6 md:px-12 py-16 md:py-20">
      <div className="flex flex-col md:flex-row justify-between gap-12">
        {/* Left: slogan */}
        <div className="max-w-md">
          <p className="font-display text-2xl md:text-3xl italic leading-snug opacity-90">
            Keep humans in the loop.
          </p>
          <p className="font-mono text-xs tracking-widest uppercase mt-4 opacity-50">
            Made with &lt;3 and lots of coffee
          </p>
        </div>

        {/* Right: links */}
        <div className="flex gap-16 md:gap-24">
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs tracking-widest uppercase opacity-50 mb-1">
              Say Hi
            </span>
            <a
              href="https://www.linkedin.com/in/evefan-upenn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm opacity-70 hover:opacity-100 transition-opacity"
            >
              LINKEDIN
            </a>
            <button
              onClick={handleCopyEmail}
              className={`text-sm text-left opacity-70 hover:opacity-100 transition-opacity ${
                emailState === "copied" ? "cursor-default" : "cursor-copy"
              }`}
              style={
                emailState === "idle"
                  ? { cursor: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect width='16' height='13' x='6' y='4' rx='2'/><path d='m22 7-7.1 3.78c-.57.3-1.23.3-1.8 0L6 7'/><path d='M2 8v8c0 1.1.9 2 2 2h2'/></svg>") 12 12, copy` }
                  : undefined
              }
            >
              {emailState === "copied" ? "EMAIL COPIED!" : "EMAIL"}
            </button>
            <a
              href="https://drive.google.com/file/d/1w6oww6QF6538PTvxRMee5T4YXAtOvx9h/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm opacity-70 hover:opacity-100 transition-opacity"
            >
              RESUME
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs tracking-widest uppercase opacity-50 mb-1">
              Page
            </span>
            <Link
              to="/"
              className="text-sm opacity-70 hover:opacity-100 transition-opacity"
            >
              HOME
            </Link>
            <Link
              to="/playground"
              className="text-sm opacity-70 hover:opacity-100 transition-opacity"
            >
              PLAYGROUND
            </Link>
            <Link
              to="/contact"
              className="text-sm opacity-70 hover:opacity-100 transition-opacity"
            >
              ABOUT
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
